import dotenv from "dotenv";
dotenv.config({path: `${process.cwd}/.env`});

export const PORT = process.env.PORT || 5002;
export const MONGO_URI = process.env.MONGODB_URI;
export const CLIENT_PORT = process.env.CLIENT_PORT;
export const JWT_SECRET: string = String(process.env.JWT_SECRET)