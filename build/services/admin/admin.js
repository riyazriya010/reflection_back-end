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
exports.adminServices = void 0;
const admin_1 = __importDefault(require("../../repositories/admin/admin"));
class AdminServices {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    createForm(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validFieldTypes = ['text', 'textarea', 'radio', 'checkbox', 'select', 'rating', 'scale'];
                for (const field of formData.fields) {
                    if (!validFieldTypes.includes(field.type)) {
                        throw new Error(`Invalid field type: ${field.type}`);
                    }
                    if (['radio', 'checkbox', 'select'].includes(field.type) &&
                        (!field.options || field.options.length === 0)) {
                        throw new Error(`${field.type} fields require options`);
                    }
                }
                const response = yield this.adminRepository.createForm(formData);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AdminServices;
const adminRepository = new admin_1.default();
exports.adminServices = new AdminServices(adminRepository);
