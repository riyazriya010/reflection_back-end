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
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerFeedbackController = void 0;
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const feedback_services_1 = require("../../services/manager/feedback.services");
const responseHelpers_1 = require("../../utils/responseHelpers");
class ManagerFeedbackController {
    constructor(managerFeedbackServices) {
        this.managerFeedbackServices = managerFeedbackServices;
    }
    getEmployeesFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { department } = req.query;
                const getEmployeesFeedback = yield this.managerFeedbackServices.getEmployeesFeedback(String(department));
                (0, responseHelpers_1.sendDataResponse)(res, 'Employees Feedbacks Got IT', getEmployeesFeedback, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
}
exports.default = ManagerFeedbackController;
exports.managerFeedbackController = new ManagerFeedbackController(feedback_services_1.managerFeedbackServices);
