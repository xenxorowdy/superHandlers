import { NextResponse } from "next/server";

import { connectToDb,getfiles } from "../upload/route";

export async function POST(request) {
      if(request.method == 'POST'){
        try {
            const {client} = await connectToDb();
             const result = await client
            .db()
            .collection("images.files")
            .find().sort({uploadDate:-1})
            .project({"filename": 1,metadata:1}).toArray();

            // console.log(fileNameArr);
            return  NextResponse.json({result:result})
        } catch (error) {
          return new Response('failed');
        }
      }
}
    
