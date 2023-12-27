
import { NextAuthOptions } from "next-auth";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connect from "@/utilities/mongoose";
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/utilities/mongodb";
export const authOptions: NextAuthOptions = {
    providers:[
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