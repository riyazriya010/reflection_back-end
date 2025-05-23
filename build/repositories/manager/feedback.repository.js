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
const baseRepository_1 = __importDefault(require("../base/baseRepository"));
class ManagerFeedbackRepository extends baseRepository_1.default {
    constructor() {
        super({
            FeedbackModel: feedback_model_1.default,
            EmployeeModel: employee_model_1.default
        });
    }
    findAllDeptEmployees(department) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('EmployeeModel', { department });
        });
    }
    getEmployeesFeedback() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('FeedbackModel');
        });
    }
}
exports.default = ManagerFeedbackRepository;
