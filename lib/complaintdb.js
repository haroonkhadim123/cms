// lib/complaintdb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("⚠️ Please add your MongoDB URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev mode, reuse the global variable to avoid multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri); // ✅ No options needed anymore
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client each time
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
