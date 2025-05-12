import dotenv from "dotenv";
dotenv.config({path: `${process.cwd}/.env`});

export const PORT = process.env.PORT || 5002;
export const MONGO_URI = process.env.MONGODB_URI;
export const CLIENT_PORT = process.env.CLIENT_PORT;
export const JWT_SECRET: string = String(process.env.JWT_SECRET)

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const FEEDBACK_LINK = process.env.FEEDBACK_LINK
export const FEEDBACK_GET_LINK = process.env.FEEDBACK_GET_LINK