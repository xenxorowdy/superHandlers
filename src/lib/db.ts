import { GridFSBucket, MongoClient } from "mongodb";

declare global {
  var client: MongoClient | undefined;
  var bucket: GridFSBucket | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function connectToDb() {
  if (global.client && global.bucket) {
    return {
      client: global.client,
      bucket: global.bucket,
    };
  }

  const client = (global.client = new MongoClient(MONGODB_URI, {}));
  const bucket = (global.bucket = new GridFSBucket(client.db(), {
    bucketName: "images",
  }));

  await client.connect();

  return { client, bucket };
}
