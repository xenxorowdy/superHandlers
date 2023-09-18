import { connectToDb } from "../../upload/route";

export async function DELETE(request,{params}) {

  const { client } = await connectToDb();
  console.log(params.filename);
  const result = await client
    .db()
    .collection("images.files").deleteMany({ filename: params.filename });
  
  return new Response("delete api")
}
