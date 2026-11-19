import fs from 'fs';
import path from 'path';
import jobsData from './jobs.json';

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
    console.error('Error saving jobs to file:', error);
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

export function getJobById(id: number): JobDetails | undefined {
  const allJobs = getJobsFromFile();
  return allJobs.find((job) => job.id === id);
}

