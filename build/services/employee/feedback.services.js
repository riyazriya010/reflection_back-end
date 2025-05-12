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
exports.employeeFeedbackServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const feedback_repository_1 = __importDefault(require("../../repositories/employee/feedback.repository"));
const nodemailer_1 = __importDefault(require("../../integrations/nodemailer"));
const contants_1 = require("../../utils/contants");
class EmployeeFeedbackServices {
    constructor(employeeFeedbackRepository) {
        this.employeeFeedbackRepository = employeeFeedbackRepository;
    }
    requestFeedback(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findPeer = yield this.employeeFeedbackRepository.findByIds(String(data.peerId));
                const findSender = yield this.employeeFeedbackRepository.findByIds(String(data.senderId));
                let newObj = {
                    senderId: new mongoose_1.default.Types.ObjectId(data.senderId),
                    receiverId: new mongoose_1.default.Types.ObjectId(data.peerId),
                    receiverName: findPeer === null || findPeer === void 0 ? void 0 : findPeer.username,
                    senderName: findSender === null || findSender === void 0 ? void 0 : findSender.username,
                    message: data.message,
                    deadline: data.deadline,
                    status: 'pending'
                };
                const mail = new nodemailer_1.default();
                mail.sendFeedbackRequestMail(String(findPeer === null || findPeer === void 0 ? void 0 : findPeer.email), String(contants_1.FEEDBACK_LINK), newObj.receiverName, newObj.senderName, newObj.deadline)
                    .then(info => {
                    console.log('Feedback Request email sent successfully: ');
                })
                    .catch(error => {
                    console.error('Failed to send Feedback Request email:', error);
                });
                const response = yield this.employeeFeedbackRepository.requestFeedback(newObj);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    requestedFeedback(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.employeeFeedbackRepository.requestedFeedback(senderId);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getOthersRequested(receiverId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.employeeFeedbackRepository.getOthersRequested(receiverId, status);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllForm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.employeeFeedbackRepository.getAllForm();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    submitFeedback(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { formId, requestedId, rating, message } = data;
                const requested = yield this.employeeFeedbackRepository.FindRequestedFeedbackById(requestedId);
                const requestedPerson = yield this.employeeFeedbackRepository.findByIds(requested === null || requested === void 0 ? void 0 : requested.senderId);
                const feedbackData = {
                    senderId: requested === null || requested === void 0 ? void 0 : requested.receiverId,
                    receiverId: requested === null || requested === void 0 ? void 0 : requested.senderId,
                    requestedId,
                    formId,
                    senderName: requested.receiverName,
                    receiverName: requested.senderName,
                    rating,
                    message
                };
                const mail = new nodemailer_1.default();
                console.log(requested === null || requested === void 0 ? void 0 : requested.email);
                console.log(contants_1.FEEDBACK_GET_LINK);
                console.log(feedbackData.receiverName);
                console.log(feedbackData.senderName);
                mail.sendRemainderMail(String(requestedPerson === null || requestedPerson === void 0 ? void 0 : requestedPerson.email), String(contants_1.FEEDBACK_GET_LINK), feedbackData.receiverName, feedbackData.senderName)
                    .then(info => {
                    console.log('Feedback Request email sent successfully: ');
                })
                    .catch(error => {
                    console.error('Failed to send Feedback Request email:', error);
                });
                const response = yield this.employeeFeedbackRepository.submitFeedback(feedbackData);
                if (response) {
                    yield this.employeeFeedbackRepository.updateRequestedFeedback(requestedId);
                }
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllRequestedToMe(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.employeeFeedbackRepository.getAllRequestedToMe(receiverId);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    rejectRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.employeeFeedbackRepository.rejectRequest(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMyRequestes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const replyResponse = yield this.employeeFeedbackRepository.getMyRequestes(id);
                console.log('replyRes: ', replyResponse);
                const requestResponse = yield this.employeeFeedbackRepository.FindRequestedFeedbackById(id);
                console.log('reQeRes: ', requestResponse);
                // Create combined response with only required fields
                const combinedResponse = {
                    senderName: ((_a = replyResponse[0]) === null || _a === void 0 ? void 0 : _a.senderName) || 'Unknown',
                    requestedMessage: (requestResponse === null || requestResponse === void 0 ? void 0 : requestResponse.message) || '',
                    status: (requestResponse === null || requestResponse === void 0 ? void 0 : requestResponse.status) || 'pending',
                    repliedMessage: ((_b = replyResponse[0]) === null || _b === void 0 ? void 0 : _b.message) || null,
                    rating: ((_c = replyResponse[0]) === null || _c === void 0 ? void 0 : _c.rating) || null,
                    deadLine: requestResponse === null || requestResponse === void 0 ? void 0 : requestResponse.deadline,
                    requestCreatedAt: (requestResponse === null || requestResponse === void 0 ? void 0 : requestResponse.createdAt) || new Date().toISOString(),
                    replyCreatedAt: ((_d = replyResponse[0]) === null || _d === void 0 ? void 0 : _d.createdAt) || null
                };
                return combinedResponse;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getFeedbackMessages(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feedbacks = yield this.employeeFeedbackRepository.getAllFeedbackForReceiver(receiverId);
                const messages = feedbacks.map((fb) => fb.message);
                return messages;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = EmployeeFeedbackServices;
const employeeFeedbackRepository = new feedback_repository_1.default();
exports.employeeFeedbackServices = new EmployeeFeedbackServices(employeeFeedbackRepository);
