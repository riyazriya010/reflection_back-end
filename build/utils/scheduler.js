"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const request_model_1 = __importDefault(require("../models/request.model"));
const employee_model_1 = __importDefault(require("../models/employee.model"));
const nodemailer_1 = __importDefault(require("../integrations/nodemailer"));
const contants_1 = require("./contants");
//this runs at midnight
// this is for expire the request
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    yield request_model_1.default.updateMany({
        deadline: { $lt: now },
        status: 'pending'
    }, { $set: { status: 'expired' } });
    console.log('Expired old feedback requests');
}));
//this is for send remainder mail about request deadline
const mailer = new nodemailer_1.default();
//this runs at midnight
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(now.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999);
    const reminders = yield request_model_1.default.find({
        deadline: { $gte: tomorrowStart, $lte: tomorrowEnd },
        status: 'pending',
    });
    for (const request of reminders) {
        const receiver = yield employee_model_1.default.findById(request.receiverId);
        const sender = yield employee_model_1.default.findById(request.senderId);
        if ((receiver === null || receiver === void 0 ? void 0 : receiver.email) && (sender === null || sender === void 0 ? void 0 : sender.username)) {
            const feedbackLink = `${contants_1.FEEDBACK_LINK}`;
            const expireDate = request.deadline.toLocaleString();
            yield mailer.sendDeadlineRemainderMail(receiver.email, receiver.username, sender.username, feedbackLink, expireDate);
        }
    }
    console.log(`Sent ${reminders.length} feedback deadline reminder email's`);
}));
