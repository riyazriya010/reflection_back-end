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
const manager_model_1 = __importDefault(require("../../models/manager.model"));
const baseRepository_1 = __importDefault(require("../base/baseRepository"));
class ManagerAuthRepository extends baseRepository_1.default {
    constructor() {
        super({
            ManagerModel: manager_model_1.default
        });
    }
    managerSignup(managerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createData('ManagerModel', managerData);
        });
    }
    managerLogin(managerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne('ManagerModel', { email: managerData.email });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne('ManagerModel', { email });
        });
    }
}
exports.default = ManagerAuthRepository;
