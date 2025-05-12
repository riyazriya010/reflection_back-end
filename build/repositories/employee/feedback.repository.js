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
const employee_model_1 = __importDefault(require("../../models/employee.model"));
const feedback_model_1 = __importDefault(require("../../models/feedback.model"));
const form_model_1 = __importDefault(require("../../models/form.model"));
const request_model_1 = __importDefault(require("../../models/request.model"));
const baseRepository_1 = __importDefault(require("../base/baseRepository"));
class EmployeeFeedbackRepository extends baseRepository_1.default {
    constructor() {
        super({
            EmployeeModel: employee_model_1.default,
            FeedbackRequestModel: request_model_1.default,
            FormModel: form_model_1.default,
            FeedbackModel: feedback_model_1.default
        });
    }
    requestFeedback(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createData('FeedbackRequestModel', data);
        });
    }
    requestedFeedback(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('FeedbackRequestModel', { senderId: { $eq: senderId } });
        });
    }
    getOthersRequested(receiverId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('FeedbackRequestModel', { receiverId: receiverId, status: { $regex: new RegExp(`^${status}$`, 'i') } });
        });
    }
    getAllForm() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('FormModel');
        });
    }
    submitFeedback(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createData('FeedbackModel', data);
        });
    }
    findByIds(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById('EmployeeModel', id);
        });
    }
    FindRequestedFeedbackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById('FeedbackRequestModel', id);
        });
    }
    updateRequestedFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateById('FeedbackRequestModel', id, {
                status: 'responded',
                updatedAt: new Date()
            });
        });
    }
    getAllRequestedToMe(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('FeedbackRequestModel', { receiverId: receiverId });
        });
    }
    rejectRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateById('FeedbackRequestModel', id, { status: 'rejected', updatedAt: new Date() });
        });
    }
    getMyRequestes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('FeedbackModel', { requestedId: id });
        });
    }
    getAllFeedbackForReceiver(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('FeedbackModel', { receiverId });
        });
    }
}
exports.default = EmployeeFeedbackRepository;
