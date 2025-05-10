"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_PORT = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${process.cwd}/.env` });
exports.PORT = process.env.PORT || 5002;
exports.MONGO_URI = process.env.MONGODB_URI;
exports.CLIENT_PORT = process.env.CLIENT_PORT;
