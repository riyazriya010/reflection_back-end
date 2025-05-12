import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt'

export interface IManager extends Document {
    _id: ObjectId
    username: string;
    email: string;
    department: string;
    phone: string;
    password: string;
    role: string
}

const ManagerShcema: Schema<IManager> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'manager' },
},
    {
        timestamps: true
    }
)

ManagerShcema.pre('save', async function(next) {
    try{
        const manager = this
        const hashedPassword = await bcrypt.hash(manager.password, 12)
        manager.password = hashedPassword
        next()
    }catch(error: any){
        next(error)
    }
})

const ManagerModel = mongoose.model<IManager>('manager', ManagerShcema)

export default ManagerModel
