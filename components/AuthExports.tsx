
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/utilities/mongodb";
export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
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
    
    authorization:{
        url: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
        params:{
            redirect_url: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        }
    }

}