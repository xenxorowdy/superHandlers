import { connectToDb } from "../upload/route";


export async function POST(request) {
    const req = await request.json()
    const {client} = connectToDb()
const result = await client
.db()
.collection("password.check")
.estimatedDocumentCount(req)
if(result>0){
    return new Response(`success`);
}
  return new Response("failed")
}
