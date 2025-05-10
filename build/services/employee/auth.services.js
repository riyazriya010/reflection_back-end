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
exports.employeeAuthServices = void 0;
const auth_repository_1 = __importDefault(require("../../repositories/employee/auth.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class EmployeeAuthServices {
    constructor(employeeAuthRepository) {
        this.employeeAuthRepository = employeeAuthRepository;
    }
    employeeSignup(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find Employee Already Exist With Email
                const ExistEmployee = yield this.employeeAuthRepository.findByEmail(employeeData.email);
                if (ExistEmployee) {
                    const error = new Error('Employee Already Exist');
                    error.name = 'EmployeeAlreadyExist';
                    throw error;
                }
                const savedEmployee = yield this.employeeAuthRepository.employeeSignup(employeeData);
                return savedEmployee;
            }
            catch (error) {
                throw error;
            }
        });
    }
    employeeLogin(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield this.employeeAuthRepository.employeeLogin(employeeData);
                if (!login) {
                    const error = new Error('Invalid Credentials');
                    error.name = "InvalidCredentials";
                    throw error;
                }
                const isPassword = yield bcrypt_1.default.compare(employeeData.password, login.password);
                if (!isPassword) {
                    const error = new Error('Invalid Credentials');
                    error.name = "InvalidCredentials";
                    throw error;
                }
                return login;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = EmployeeAuthServices;
const employeeAuthRepository = new auth_repository_1.default();
exports.employeeAuthServices = new EmployeeAuthServices(employeeAuthRepository);
