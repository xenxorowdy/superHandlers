import { MongoClient, GridFSBucket } from "mongodb";
declare global {
  var client: MongoClient | null;
  var bucket: GridFSBucket | null;
}
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

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
  console.log("Connected to the Database");
  return { client, bucket: bucket! };
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bucket } = await connectToDb();
    const data = await req.formData();

    const imageFile = data.get("image") as Blob | null;
    const title = (data.get("title") as string) || "";
    const description = (data.get("description") as string) || "";
    const price = (data.get("price") as string) || "";
    const category = (data.get("category") as string) || "";

    if (!imageFile || typeof imageFile === "string") {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    if (!title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const fileExtension = imageFile.type.split("/").pop() || "jpg";
    const filename = `${uuidv4()}.${fileExtension}`;

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: imageFile.type,
      metadata: { title, description, price, selected: category },
    });

    await new Promise<void>((resolve, reject) => {
      stream.pipe(uploadStream).on("finish", resolve).on("error", reject);
    });

    return NextResponse.json({ success: true, filename });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
