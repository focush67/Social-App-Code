
import { NextAuthOptions } from "next-auth";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/UserSchema";
import bcrypt from "bcrypt";
import connect from "@/utilities/mongoose";
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/utilities/mongodb";
export const authOptions: NextAuthOptions = {
    providers:[
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: {label: "Email", type: "email", placeholder:"example@gmail.com"},
        //         password: {label: "Password",type: "password", placeholder: "***"}
        //     },

        //     async authorize(credentials,request){
        //         const email = credentials?.email;
        //         const password = credentials?.password;
        //         console.log({email,password});
        //         try {
        //             await connect();
        //             const user = await User.findOne({email});
        //             if(!user){
        //                 return null;
        //             }

        //             const passMatch = await bcrypt.compare(password! , user?.password);
        //             if(passMatch){
        //                 const userWithImage = {
        //                     ...user.toObject(),
        //                     image: user?.image || "",
        //                 };
        //                 return userWithImage;
        //             }

        //             console.log("Wrong Password");

        //             return null;
        //         } catch (error:any){
        //             console.log("Error at auth: ",error);
        //         }
        //         return null;
        //     }
        // }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
        }),
    ],

    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    
    session:{
        strategy:"jwt",
        maxAge: 12*60*60,
    },

    adapter: MongoDBAdapter(clientPromise),

    authorization:{
        url: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
        params:{
            redirect_url: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        }
    }

}