// import { connect } from "@/lib/mongo/connect"

export async function GET(request) {
//   if(request.method == 'GET'){
//     try {
//       const db = await connect().catch(e=>e);
//       return new Response(db);
//     } catch (error) {
//       return new Response('failed');
//     }
//   }
  return new Response('Hello, Next.js!')
}
