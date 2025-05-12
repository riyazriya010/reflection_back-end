import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt'

export interface IEmployee extends Document {
    _id: ObjectId
    username: string;
    email: string;
    department: string;
    phone: string;
    password: string;
    role: string
}

const EmployeeShcema: Schema<IEmployee> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'employee' },
},
    {
        timestamps: true
    }
)

EmployeeShcema.pre('save', async function(next) {
    try{
        const employee = this
        const hashedPassword = await bcrypt.hash(employee.password, 12)
        employee.password = hashedPassword
        next()
    }catch(error: any){
        next(error)
    }
})

const EmployeeModel = mongoose.model<IEmployee>('employee', EmployeeShcema)

export default EmployeeModel
