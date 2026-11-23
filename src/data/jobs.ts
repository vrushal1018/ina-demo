import fs from 'fs';
import path from 'path';
import jobsData from './jobs.json';
import { getJobsCollection, getMongoDb, isMongoConfigured } from '@/lib/mongodb';

export interface JobDetails {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  isActive?: boolean;
  createdAt?: string;
}

export interface SaveJobResult {
  success: boolean;
  mongoSaved: boolean;
  fileSaved: boolean;
  error?: string;
}

const JOBS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'jobs.json');

// --- Synchronous File Operations (Fallback / Local / SSR Initial) ---

export function getJobsFromFile(): JobDetails[] {
  try {
    if (fs.existsSync(JOBS_FILE_PATH)) {
      const fileData = fs.readFileSync(JOBS_FILE_PATH, 'utf-8');
      return JSON.parse(fileData) as JobDetails[];
    }
  } catch (error) {
    console.error('Error reading jobs file:', error);
  }
  return jobsData as JobDetails[];
}

export function saveJobsToFile(jobs: JobDetails[]): boolean {
  try {
    const dir = path.dirname(JOBS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
    return true;
  } catch (error) {
    // In serverless environments like Vercel, filesystem is read-only
    console.warn('Filesystem write not available or failed (expected on Vercel):', error);
    return false;
  }
}

export function getAllJobs(): JobDetails[] {
  return getJobsFromFile();
}

export function getActiveJobs(): JobDetails[] {
  const allJobs = getJobsFromFile();
  return allJobs.filter((job) => job.isActive !== false);
}

// --- Asynchronous MongoDB Operations (With Automatic Fallback & Seed Guard) ---

let isSeeded = false;

async function ensureMongoSeeded() {
  if (isSeeded) return;
  try {
    const collection = await getJobsCollection();
    if (!collection) return;
    const db = await getMongoDb();
    if (!db) return;

    // Use metadata collection to ensure seeding happens ONLY once, never resurrecting deleted/unlived jobs
    const metaCollection = db.collection('system_meta');
    const seedMeta = await metaCollection.findOne({ key: 'jobs_initial_seed' });
    if (seedMeta) {
      isSeeded = true;
      return;
    }

    const count = await collection.countDocuments();
    if (count === 0) {
      const fileJobs = getJobsFromFile();
      if (fileJobs.length > 0) {
        await collection.insertMany(fileJobs as any);
        console.log(`Auto-seeded ${fileJobs.length} initial jobs to MongoDB Atlas`);
      }
    }

    await metaCollection.updateOne(
      { key: 'jobs_initial_seed' },
      { $set: { key: 'jobs_initial_seed', seededAt: new Date().toISOString() } },
      { upsert: true }
    );
    isSeeded = true;
  } catch (error) {
    console.error('Error ensuring MongoDB seed:', error);
  }
}

export async function getAllJobsAsync(): Promise<JobDetails[]> {
  if (isMongoConfigured()) {
    try {
      await ensureMongoSeeded();
      const collection = await getJobsCollection();
      if (collection) {
        const jobs = await collection
          .find({}, { projection: { _id: 0 } })
          .sort({ id: -1 })
          .toArray();
        if (jobs) {
          return jobs as JobDetails[];
        }
      }
    } catch (error) {
      console.error('MongoDB query error in getAllJobsAsync, falling back to JSON:', error);
    }
  }
  return getJobsFromFile();
}

export async function getActiveJobsAsync(): Promise<JobDetails[]> {
  if (isMongoConfigured()) {
    try {
      await ensureMongoSeeded();
      const collection = await getJobsCollection();
      if (collection) {
        const jobs = await collection
          .find({ isActive: { $ne: false } }, { projection: { _id: 0 } })
          .sort({ id: -1 })
          .toArray();
        // If MongoDB query succeeded, return results even if empty [] (do not resurrect old jobs!)
        if (jobs) {
          return jobs as JobDetails[];
        }
      }
    } catch (error) {
      console.error('MongoDB query error in getActiveJobsAsync, falling back to JSON:', error);
    }
  }
  return getActiveJobs();
}

export async function addJobAsync(newJob: JobDetails): Promise<SaveJobResult> {
  let mongoSaved = false;
  let mongoError: string | undefined;

  if (isMongoConfigured()) {
    try {
      const collection = await getJobsCollection();
      if (collection) {
        await collection.insertOne({ ...newJob } as any);
        mongoSaved = true;
      } else {
        mongoError = 'MongoDB connection timed out or was rejected. Check your Network Access (IP whitelist) in MongoDB Atlas.';
      }
    } catch (error: any) {
      mongoError = error?.message || 'MongoDB connection error';
      console.error('MongoDB insert error in addJobAsync:', error);
    }
  }

  // Update local file storage
  const currentJobs = getJobsFromFile();
  const fileSaved = saveJobsToFile([newJob, ...currentJobs]);

  const success = mongoSaved || fileSaved;

  return {
    success,
    mongoSaved,
    fileSaved,
    error: !success ? (mongoError || 'Unable to save to persistent storage') : undefined,
  };
}

export async function updateJobAsync(id: number, updates: Partial<JobDetails>): Promise<JobDetails | null> {
  let updatedJob: JobDetails | null = null;
  const numId = Number(id);

  if (isMongoConfigured()) {
    try {
      const collection = await getJobsCollection();
      if (collection) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...fieldsToSet } = updates;
        await collection.updateOne(
          { $or: [{ id: numId }, { id: String(numId) as any }] },
          { $set: fieldsToSet }
        );

        const doc = await collection.findOne(
          { $or: [{ id: numId }, { id: String(numId) as any }] },
          { projection: { _id: 0 } }
        );

        if (doc) {
          updatedJob = doc as JobDetails;
        }
      }
    } catch (error) {
      console.error('MongoDB update error in updateJobAsync:', error);
    }
  }

  // Update local file if available
  const currentJobs = getJobsFromFile();
  const index = currentJobs.findIndex((j) => Number(j.id) === numId);
  if (index !== -1) {
    currentJobs[index] = { ...currentJobs[index], ...updates };
    saveJobsToFile(currentJobs);
    if (!updatedJob) {
      updatedJob = currentJobs[index];
    }
  } else if (updatedJob) {
    saveJobsToFile([updatedJob, ...currentJobs]);
  }

  return updatedJob;
}

export async function deleteJobAsync(id: number): Promise<boolean> {
  let mongoDeleted = false;
  const numId = Number(id);

  if (isMongoConfigured()) {
    try {
      const collection = await getJobsCollection();
      if (collection) {
        const result = await collection.deleteOne({
          $or: [{ id: numId }, { id: String(numId) as any }],
        });
        mongoDeleted = result.deletedCount > 0;
      }
    } catch (error) {
      console.error('MongoDB delete error in deleteJobAsync:', error);
    }
  }

  // Update local file if available
  const currentJobs = getJobsFromFile();
  const filtered = currentJobs.filter((j) => Number(j.id) !== numId);
  const fileSuccess = saveJobsToFile(filtered);

  return mongoDeleted || fileSuccess;
}
