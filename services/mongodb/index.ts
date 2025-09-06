import { env } from 'config';
import { MongoClient, type MongoClientOptions } from 'mongodb';

declare namespace global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const options: MongoClientOptions = {};

let client;
let clientPromise: Promise<MongoClient>;

if (env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(env.MONGO_DB_DATABASE_URL, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(env.MONGO_DB_DATABASE_URL, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
