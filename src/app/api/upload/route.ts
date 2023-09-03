// lib/mongo.ts
import { MongoClient, GridFSBucket } from "mongodb";
declare global {
  var client: MongoClient | null;
  var bucket: GridFSBucket | null;
}
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/* 
  Initializes the connection to mongodb and creates a GridFSBucket
  Once connected, it will use the cached connection.
 */
export async function connectToDb() {
  if (global.client) {
    return {
      client: global.client,
      bucket: global.bucket!,
    };
  }

  const client = (global.client = new MongoClient(MONGODB_URI!, {}));
  const bucket = (global.bucket = new GridFSBucket(client.db(), {
    bucketName: "images",
  }));

  await global.client.connect();
  console.log("Connected to the Database ");
  return { client, bucket: bucket! };
}

// utility to check if file exists
async function fileExists(filename: string): Promise<boolean> {
  const { client } = await connectToDb();
  const count = await client
    .db()
    .collection("images.files")
    .countDocuments({ filename });

  return !!count;
}
// app/api/upload


export async function POST(req: Request) {
  const { bucket } = await connectToDb();
  // get the form data
  // console.log(req,JSON.stringify(await req.formData()));
  const data = await req.formData();
  console.log("developer...",data);
  // // map through all the entries
  let key='';
  let arr = [];
  for (const entry of Array.from(data.entries())) {
    let [keys, values] = entry;
    key = keys;
    arr.push(values);
    // console.log(JSON.stringify(entry));
  }
    // FormDataEntryValue can either be type `Blob` or `string`
    // if its type is object then it's a Blob
    console.log(key);
    let value = arr[1];
    let con = arr[0].split("//sdeqwe,") ;
    const obj = {title:con[0],description:con[1],price:con[2],selected:con[3]}
    // console.log(con);
    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as Blob;
      const fileExtension = blob.name.split('.').pop();
      const filename = `${uuidv4()}.${fileExtension}`
      // const existing = await fileExists(filename);
      // if (existing) {
      //   // If file already exists, let's skip it.
      //   // If you want a different behavior such as override, modify this part.
      //   continue;
      // }

    //   //conver the blob to stream
      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);
      
      const uploadStream = bucket.openUploadStream(filename, {
        // make sure to add content type so that it will be easier to set later.
        contentType: blob.type,
        
        metadata: {...obj}, //add your metadata here if any
      });

      // pipe the readable stream to a writeable stream to save it to the database
      await stream.pipe(uploadStream);
    }
  

  // return the response after all the entries have been processed.
  return NextResponse.json({ success: true });
}
