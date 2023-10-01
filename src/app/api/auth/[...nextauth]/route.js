import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

import { NextResponse } from "next/server";

import { connectToDb,getfiles } from "../../upload/route";
 async function login(req) {
        const {client} = await connectToDb();
        if(!req) return null
        const dbResult = await client
                        .db()
                        .collection("password.check").findOne({email:req.email})
        if(!dbResult){
            return new NextResponse(null,{ status: 401, statusText: "Bad Request" })
        }
        console.log(dbResult)
        // const password = dbResult.password;
        const {password ,createdAt,_id,...User} = dbResult
        if(req.password !== password){
            return null
        }
        console.log(User);
        return User;
    
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name:"email",
      credentials:{
        email:{
          label:"Email",
          type:"text",
          placeholder:"example@example.com"
        },
        password:{
          label:"Password",
          type:"password",
          placeholder:"password"
        }      
      },
      async authorize(credential){
        console.log(credential)
        if(!credential || !credential.email || !credential.password){
          return null
        }
        return await login(credential)
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET?? "",
    }),
    // ...add more providers here
  ],
}

export const handler =  NextAuth(authOptions)
export {handler as GET, handler as POST}