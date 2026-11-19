import fs from 'fs';
import path from 'path';
import jobsData from './jobs.json';
import { getJobsCollection, isMongoConfigured } from '@/lib/mongodb';

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

// --- Asynchronous MongoDB Operations (With Automatic Fallback & Auto-Seed) ---

let isSeeded = false;

async function ensureMongoSeeded() {
  if (isSeeded) return;
  try {
    const collection = await getJobsCollection();
    if (!collection) return;

    const count = await collection.countDocuments();
    if (count === 0) {
      const fileJobs = getJobsFromFile();
      if (fileJobs.length > 0) {
        await collection.insertMany(fileJobs as any);
        console.log(`Auto-seeded ${fileJobs.length} initial jobs to MongoDB Atlas`);
      }
    }
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
        return jobs as JobDetails[];
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
        return jobs as JobDetails[];
      }
    } catch (error) {
      console.error('MongoDB query error in getActiveJobsAsync, falling back to JSON:', error);
    }
  }
  return getActiveJobs();
}

export async function addJobAsync(newJob: JobDetails): Promise<boolean> {
  let mongoSuccess = false;

  if (isMongoConfigured()) {
    try {
      const collection = await getJobsCollection();
      if (collection) {
        await collection.insertOne({ ...newJob } as any);
        mongoSuccess = true;
      }
    } catch (error) {
      console.error('MongoDB insert error in addJobAsync:', error);
    }
  }

  // Also update local file if possible (e.g. during local dev)
  const currentJobs = getJobsFromFile();
  saveJobsToFile([newJob, ...currentJobs]);

  return mongoSuccess || !isMongoConfigured();
}

export async function updateJobAsync(id: number, updates: Partial<JobDetails>): Promise<JobDetails | null> {
  let updatedJob: JobDetails | null = null;

  if (isMongoConfigured()) {
    try {
      const collection = await getJobsCollection();
      if (collection) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...fieldsToSet } = updates;
        const result = await collection.findOneAndUpdate(
          { id },
          { $set: fieldsToSet },
          { returnDocument: 'after', projection: { _id: 0 } }
        );
        if (result) {
          updatedJob = result as unknown as JobDetails;
        }
      }
    } catch (error) {
      console.error('MongoDB update error in updateJobAsync:', error);
    }
  }

  // Update local file if available
  const currentJobs = getJobsFromFile();
  const index = currentJobs.findIndex((j) => j.id === id);
  if (index !== -1) {
    currentJobs[index] = { ...currentJobs[index], ...updates };
    saveJobsToFile(currentJobs);
    if (!updatedJob) {
      updatedJob = currentJobs[index];
    }
  }

  return updatedJob;
}

export async function deleteJobAsync(id: number): Promise<boolean> {
  let mongoDeleted = false;

  if (isMongoConfigured()) {
    try {
      const collection = await getJobsCollection();
      if (collection) {
        const result = await collection.deleteOne({ id });
        mongoDeleted = result.deletedCount > 0;
      }
    } catch (error) {
      console.error('MongoDB delete error in deleteJobAsync:', error);
    }
  }

  // Update local file if available
  const currentJobs = getJobsFromFile();
  const filtered = currentJobs.filter((j) => j.id !== id);
  const fileSuccess = saveJobsToFile(filtered);

  return mongoDeleted || fileSuccess;
}
