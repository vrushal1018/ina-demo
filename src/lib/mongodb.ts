import { MongoClient, Db, Collection } from 'mongodb';
import { JobDetails } from '@/data/jobs';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || 'inatechfm';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb'));
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!isMongoConfigured() || !MONGODB_URI) {
    return null;
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      // In development mode, use a global variable so the connection is preserved across module reloads
      if (!global._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI, {
          serverSelectionTimeoutMS: 5000,
        });
        global._mongoClientPromise = client.connect();
      }
      return await global._mongoClientPromise;
    } else {
      // In production mode, it's best to not use a global variable
      if (!clientPromise) {
        client = new MongoClient(MONGODB_URI, {
          serverSelectionTimeoutMS: 5000,
        });
        clientPromise = client.connect();
      }
      return await clientPromise;
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  const connectedClient = await getMongoClient();
  if (!connectedClient) return null;
  return connectedClient.db(DB_NAME);
}

export async function getJobsCollection(): Promise<Collection<JobDetails> | null> {
  const db = await getMongoDb();
  if (!db) return null;
  return db.collection<JobDetails>('jobs');
}

