"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEEDBACK_GET_LINK = exports.FEEDBACK_LINK = exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = exports.JWT_SECRET = exports.CLIENT_PORT = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${process.cwd}/.env` });
exports.PORT = process.env.PORT || 5002;
exports.MONGO_URI = process.env.MONGODB_URI;
exports.CLIENT_PORT = process.env.CLIENT_PORT;
exports.JWT_SECRET = String(process.env.JWT_SECRET);
exports.ADMIN_EMAIL = process.env.ADMIN_EMAIL;
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
exports.FEEDBACK_LINK = process.env.FEEDBACK_LINK;
exports.FEEDBACK_GET_LINK = process.env.FEEDBACK_GET_LINK;
