import mongoose from "mongoose";

export default function connect(){
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }

    else{
        const uri = process.env.NEXT_PUBLIC_MONGO_URI!;
        if(!uri){
            throw new Error("MongoDB Connection String not found");
        }
        else{
            console.log("DB Online");
            return mongoose.connect(uri);
        }
    }
}