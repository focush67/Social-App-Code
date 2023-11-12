
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/UserSchema";
import bcrypt from "bcrypt";
import connect from "@/utilities/mongoose";
export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder:"example@gmail.com"},
                password: {label: "Password",type: "password", placeholder: "***"}
            },

            async authorize(credentials,request){
                const email = credentials?.email;
                const password = credentials?.password;
                console.log({email,password});
                try {
                    await connect();
                    const user = await User.findOne({email});
                    if(!user){
                        return null;
                    }

                    const passMatch = await bcrypt.compare(password! , user?.password);
                    if(passMatch){
                        const userWithImage = {
                            ...user.toObject(),
                            image: user?.image || "",
                        };
                        return userWithImage;
                    }

                    console.log("Wrong Password");

                    return null;
                } catch (error:any){
                    console.log("Error at auth: ",error);
                }
                return null;
            }
        }),
    ],

    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
   
    session:{
        strategy:"jwt",
        maxAge: 12*60*60,
    },

}