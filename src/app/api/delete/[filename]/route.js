import { connectToDb } from "@/lib/db";

export async function DELETE(request, { params }) {
  const { filename } = await params;
  const { client } = await connectToDb();
  const db = client.db();

  // Find the primary file record
  const primaryFile = await db.collection("images.files").findOne({ filename });
  if (!primaryFile) {
    return new Response("File not found", { status: 404 });
  }

  // Collect all filenames to delete: primary + any extra images stored in metadata
  const extraFilenames = primaryFile.metadata?.extraImages || [];
  const allFilenames = [filename, ...extraFilenames];

  // Find all file records to get their _ids (needed to delete chunks)
  const fileRecords = await db
    .collection("images.files")
    .find({ filename: { $in: allFilenames } })
    .toArray();

  const fileIds = fileRecords.map((f) => f._id);

  await Promise.all([
    db.collection("images.files").deleteMany({ filename: { $in: allFilenames } }),
    db.collection("images.chunks").deleteMany({ files_id: { $in: fileIds } }),
  ]);

  return new Response("Deleted", { status: 200 });
}
