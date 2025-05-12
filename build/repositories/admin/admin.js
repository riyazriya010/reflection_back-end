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
const form_model_1 = __importDefault(require("../../models/form.model"));
const baseRepository_1 = __importDefault(require("../base/baseRepository"));
class AdminRepository extends baseRepository_1.default {
    constructor() {
        super({
            FormModel: form_model_1.default
        });
    }
    createForm(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newForm = new form_model_1.default({
                    title: formData.title,
                    description: formData.description,
                    fields: formData.fields.map((field) => ({
                        type: field.type,
                        label: field.label,
                        required: field.required || false,
                        anonymous: field.anonymous || false,
                        options: field.options,
                        min: field.min,
                        max: field.max,
                        step: field.step
                    })),
                    createdBy: formData.createdBy
                });
                return yield newForm.save();
            }
            catch (error) {
                console.error('Repository error creating form:', error);
                throw error;
            }
        });
    }
}
exports.default = AdminRepository;
