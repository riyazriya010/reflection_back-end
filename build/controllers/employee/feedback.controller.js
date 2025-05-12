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
exports.employeeFeedbackController = void 0;
const getId_1 = __importDefault(require("../../integrations/getId"));
const feedback_services_1 = require("../../services/employee/feedback.services");
const responseHelpers_1 = require("../../utils/responseHelpers");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
class EmployeeFeedbackController {
    constructor(employeeFeedbackServices) {
        this.employeeFeedbackServices = employeeFeedbackServices;
    }
    requestFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { peerId, message, deadline } = req.body;
                const senderId = yield (0, getId_1.default)('accessToken', req);
                const response = yield this.employeeFeedbackServices.requestFeedback({ senderId, peerId, message, deadline });
                (0, responseHelpers_1.sendDataResponse)(res, "Request created", response, httpStatusCodes_1.HttptatusCode.CREATED);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    requestedFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const senderId = yield (0, getId_1.default)('accessToken', req);
                const response = yield this.employeeFeedbackServices.requestedFeedback(senderId);
                (0, responseHelpers_1.sendDataResponse)(res, "Requested Feedbacks", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    getOthersRequested(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.query;
                const receiverId = yield (0, getId_1.default)('accessToken', req);
                const response = yield this.employeeFeedbackServices.getOthersRequested(receiverId, String(status));
                (0, responseHelpers_1.sendDataResponse)(res, "Others Requested Feedbacks", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    getAllForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.employeeFeedbackServices.getAllForm();
                (0, responseHelpers_1.sendDataResponse)(res, "All Forms Got It", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    submitFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const response = yield this.employeeFeedbackServices.submitFeedback(data);
                (0, responseHelpers_1.sendDataResponse)(res, "From Submitted", response, httpStatusCodes_1.HttptatusCode.CREATED);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    getAllRequestedToMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const receiverId = yield (0, getId_1.default)('accessToken', req);
                const response = yield this.employeeFeedbackServices.getAllRequestedToMe(receiverId);
                (0, responseHelpers_1.sendDataResponse)(res, "All Request Got IT", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    rejectRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const response = yield this.employeeFeedbackServices.rejectRequest(String(id));
                (0, responseHelpers_1.sendDataResponse)(res, "Request Rejected", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    getMyRequestes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const response = yield this.employeeFeedbackServices.getMyRequestes(String(id));
                (0, responseHelpers_1.sendDataResponse)(res, "All MY Requestes Got IT", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    getFeedbackMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const receiverId = yield (0, getId_1.default)('accessToken', req);
                const response = yield this.employeeFeedbackServices.getFeedbackMessages(receiverId);
                (0, responseHelpers_1.sendDataResponse)(res, "All MY Feedback Messages Got IT", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
}
exports.default = EmployeeFeedbackController;
exports.employeeFeedbackController = new EmployeeFeedbackController(feedback_services_1.employeeFeedbackServices);
