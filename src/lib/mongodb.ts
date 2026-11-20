import { MongoClient, Db, Collection } from 'mongodb';
import { JobDetails } from '@/data/jobs';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  const uri = process.env.MONGODB_URI?.trim();
  return Boolean(uri && uri.startsWith('mongodb'));
}

export function getDbName(): string {
  return process.env.MONGODB_DB_NAME?.trim() || 'inatechfm';
}

export async function getMongoClient(): Promise<MongoClient | null> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri || !uri.startsWith('mongodb')) {
    return null;
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      // In development mode, reuse a global variable so the connection is preserved across module reloads
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, {
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
        });
        global._mongoClientPromise = client.connect();
      }
      return await global._mongoClientPromise;
    } else {
      if (!clientPromise) {
        client = new MongoClient(uri, {
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
        });
        clientPromise = client.connect();
      }
      return await clientPromise;
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    // Reset clientPromise so future requests can retry connecting
    clientPromise = null;
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = undefined;
    }
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  const connectedClient = await getMongoClient();
  if (!connectedClient) return null;
  return connectedClient.db(getDbName());
}

export async function getJobsCollection(): Promise<Collection<JobDetails> | null> {
  const db = await getMongoDb();
  if (!db) return null;
  return db.collection<JobDetails>('jobs');
}
