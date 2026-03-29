import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { connectToDb } from "../../../lib/db";
import sharp from "sharp";

async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer();
}

async function uploadImageToGridFS(
  bucket: any,
  file: Blob,
  metadata: Record<string, unknown>
): Promise<string> {
  const filename = `${uuidv4()}.webp`;
  const raw = Buffer.from(await file.arrayBuffer());
  const buffer = await compressImage(raw);
  const stream = Readable.from(buffer);

  const uploadStream = bucket.openUploadStream(filename, {
    contentType: "image/webp",
    metadata,
  });

  await new Promise<void>((resolve, reject) => {
    stream.pipe(uploadStream).on("finish", resolve).on("error", reject);
  });

  return filename;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bucket } = await connectToDb();
    const data = await req.formData();

    const title = (data.get("title") as string) || "";
    const description = (data.get("description") as string) || "";
    const price = (data.get("price") as string) || "";
    const category = (data.get("category") as string) || "";

    if (!title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Collect all uploaded images (images[0], images[1], ...)
    const imageFiles: Blob[] = [];
    let i = 0;
    while (true) {
      const file = data.get(`images[${i}]`) as Blob | null;
      if (!file || typeof file === "string") break;
      imageFiles.push(file);
      i++;
    }

    // Fallback: legacy single "image" field
    if (imageFiles.length === 0) {
      const single = data.get("image") as Blob | null;
      if (single && typeof single !== "string") imageFiles.push(single);
    }

    if (imageFiles.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    // Upload extra images first so we have their filenames
    const extraFilenames: string[] = [];
    for (let j = 1; j < imageFiles.length; j++) {
      const extraFilename = await uploadImageToGridFS(bucket, imageFiles[j], {
        isPrimary: false,
        // primaryFilename added below after primary is uploaded
      });
      extraFilenames.push(extraFilename);
    }

    // Upload primary image with full metadata + extra filenames list
    const primaryFilename = await uploadImageToGridFS(bucket, imageFiles[0], {
      title,
      description,
      price,
      selected: category,
      extraImages: extraFilenames,
    });

    // Back-patch primaryFilename onto extra image metadata
    if (extraFilenames.length > 0) {
      const { client } = await connectToDb();
      await client
        .db()
        .collection("images.files")
        .updateMany(
          { filename: { $in: extraFilenames } },
          { $set: { "metadata.primaryFilename": primaryFilename } }
        );
    }

    return NextResponse.json({ success: true, filename: primaryFilename, extraImages: extraFilenames });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
