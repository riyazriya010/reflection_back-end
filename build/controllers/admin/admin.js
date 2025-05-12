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
exports.adminController = void 0;
const jwt_1 = require("../../integrations/jwt");
const admin_1 = require("../../services/admin/admin");
const contants_1 = require("../../utils/contants");
const responseHelpers_1 = require("../../utils/responseHelpers");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
class AdminController {
    constructor(adminServices) {
        this.adminServices = adminServices;
        this.jwtService = new jwt_1.JwtService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('req ', req.body);
                const { email, password } = req.body;
                if (String(contants_1.ADMIN_EMAIL) !== email) {
                    const error = new Error('Invalid Credentials');
                    error.name = 'InvalidCredential';
                    throw error;
                }
                if (String(contants_1.ADMIN_PASSWORD) !== password) {
                    const error = new Error('Invalid Credentials');
                    error.name = 'InvalidCredential';
                    throw error;
                }
                const accessToken = yield this.jwtService.createToken(email, 'admin');
                const refreshToken = yield this.jwtService.createRefreshToken(email, 'admin');
                (0, responseHelpers_1.sendAuthResponse)(res, String(accessToken), String(refreshToken), 'Admin Logged Successfully', httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'InvalidCredential') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.UNAUTHORIZED, "InvalidCredential");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    createForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, fields } = req.body;
                if (!title || !fields || !Array.isArray(fields)) {
                    const error = new Error('Title and fields are required');
                    error.name = 'Titleandfieldsarerequired';
                    throw error;
                }
                const formData = {
                    title,
                    description: description || '',
                    fields
                };
                const createdForm = yield this.adminServices.createForm(formData);
                (0, responseHelpers_1.sendDataResponse)(res, 'Form created successfully', createdForm, httpStatusCodes_1.HttptatusCode.CREATED);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'Titleandfieldsarerequired') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.NOT_FOUND, "Title and fields are required");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    adminLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res
                    .status(200)
                    .clearCookie("accessToken", {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none",
                })
                    .clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                })
                    .send({ success: true, message: "Admin Logged out successfully" });
            }
            catch (error) {
                console.log('logout error: ', error);
                return;
            }
        });
    }
}
exports.default = AdminController;
exports.adminController = new AdminController(admin_1.adminServices);
