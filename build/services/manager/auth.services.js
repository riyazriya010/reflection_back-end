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
exports.managerAuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = __importDefault(require("../../repositories/manager/auth.repository"));
class ManagerAuthServices {
    constructor(managerAuthRepository) {
        this.managerAuthRepository = managerAuthRepository;
    }
    managerSignup(managerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find Employee Already Exist With Email
                const ExistManager = yield this.managerAuthRepository.findByEmail(managerData.email);
                if (ExistManager) {
                    const error = new Error('Manager Already Exist');
                    error.name = 'ManagerAlreadyExist';
                    throw error;
                }
                const savedEmployee = yield this.managerAuthRepository.managerSignup(managerData);
                return savedEmployee;
            }
            catch (error) {
                throw error;
            }
        });
    }
    managerLogin(managerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield this.managerAuthRepository.managerLogin(managerData);
                if (!login) {
                    const error = new Error('Invalid Credentials');
                    error.name = "InvalidCredentials";
                    throw error;
                }
                const isPassword = yield bcrypt_1.default.compare(managerData.password, login.password);
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
exports.default = ManagerAuthServices;
const managerAuthRepository = new auth_repository_1.default();
exports.managerAuthServices = new ManagerAuthServices(managerAuthRepository);
