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
exports.managerFeedbackServices = void 0;
const feedback_repository_1 = __importDefault(require("../../repositories/manager/feedback.repository"));
class ManagerFeedbackServices {
    constructor(managerFeedbackRepository) {
        this.managerFeedbackRepository = managerFeedbackRepository;
    }
    getEmployeesFeedback(dept) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departmentEmployees = yield this.managerFeedbackRepository.findAllDeptEmployees(dept);
                const employeeIds = departmentEmployees.map(emp => emp._id);
                const allFeedback = yield this.managerFeedbackRepository.getEmployeesFeedback();
                const response = allFeedback
                    .filter((feedback) => employeeIds.some(id => id.equals(feedback.receiverId)))
                    .map((f) => f.toObject());
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ManagerFeedbackServices;
const managerFeedbackRepository = new feedback_repository_1.default();
exports.managerFeedbackServices = new ManagerFeedbackServices(managerFeedbackRepository);
