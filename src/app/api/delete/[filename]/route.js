import { connectToDb } from "../../upload/route";

export async function DELETE(request, { params }) {
  const { filename } = await params;
  const { client } = await connectToDb();
  const result = await client
    .db()
    .collection("images.files").findOne({ filename });
  console.log("result:",result);
  const resfile =   client
  .db()
  .collection("images.files").deleteMany({ filename });
  const delChunk = client.db().collection("images.chunks").deleteMany({files_id:result._id})
  const res= await Promise.all([
    resfile,delChunk
  ])
  console.log(JSON.stringify(res));
  return new Response("delted Files")
}
