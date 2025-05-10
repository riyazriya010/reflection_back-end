import mongoose from "mongoose";
import { MONGO_URI } from "../utils/contants";


export async function connectDB(): Promise<void>{
    try{
        await mongoose.connect(String(MONGO_URI))
        console.log('Database connected')
    }catch(error: unknown){
        console.log('Mongoose Connecting Error: ', error)
    }
}


