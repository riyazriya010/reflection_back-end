import { ObjectId } from 'mongodb'


export type EmployeeSignUpData = {
    username: string;
    email: string;
    phone: string;
    password: string;
}

export type EmployeeLoginData = {
    email: string;
    password: string
}

export type EmployeerequestFeedback = {
    senderId: any
    peerId: any,
    message: string,
    deadline: any
}

export type EmployeeRequest = {
    senderId: ObjectId;
    receiverId: ObjectId;
    message: string;
    deadline: Date;
}