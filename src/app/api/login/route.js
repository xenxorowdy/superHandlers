// import { NextResponse } from "next/server";

// import { connectToDb,getfiles } from "../upload/route";
// export async function POST(request) {
//     if(request.method == 'POST'){
//         const {client} = await connectToDb();
//         const req = await request.json()
//         if(!req) return new NextResponse(null,{ status: 400 })
//         const dbResult = await client
//                         .db()
//                         .collection("password.check").findOne({email:req.email})
//         if(!dbResult){
//             return new NextResponse(null,{ status: 401, statusText: "Bad Request" })
//         }
//         const password = dbResult.password;
//         if(req.password !== password){
//             return new NextResponse(null,{status:400})
//         }
//         return new NextResponse("Login passed");
//     }
// }

export async function POST(request) {
    return new NextResponse("Login passed");   
}