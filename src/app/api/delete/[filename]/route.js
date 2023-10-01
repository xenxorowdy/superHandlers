import { connectToDb } from "../../upload/route";

export async function DELETE(request,{params}) {

  const { client } = await connectToDb();
  const result = await client
    .db()
    .collection("images.files").findOne({ filename: params.filename });
  console.log("result:",result);
  const resfile =   client
  .db()
  .collection("images.files").deleteMany({ filename: params.filename });
  const delChunk = client.db().collection("images.chunks").deleteMany({files_id:result._id})
  const res= await Promise.all([
    resfile,delChunk
  ])
  console.log(JSON.stringify(res));
  return new Response("delted Files")
}
