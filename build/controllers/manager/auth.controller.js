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
exports.managerAuthController = void 0;
const auth_services_1 = require("../../services/manager/auth.services");
const responseHelpers_1 = require("../../utils/responseHelpers");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const jwt_1 = require("../../integrations/jwt");
class ManagerAuthController {
    constructor(managerAuthServices) {
        this.managerAuthServices = managerAuthServices;
        this.jwtService = new jwt_1.JwtService();
    }
    managerSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const savedManager = yield this.managerAuthServices.managerSignup(data);
                const accessToken = yield this.jwtService.createToken(savedManager === null || savedManager === void 0 ? void 0 : savedManager._id, String(savedManager === null || savedManager === void 0 ? void 0 : savedManager.role));
                const refreshToken = yield this.jwtService.createRefreshToken(savedManager === null || savedManager === void 0 ? void 0 : savedManager._id, String(savedManager === null || savedManager === void 0 ? void 0 : savedManager.role));
                (0, responseHelpers_1.sendAuthResponse)(res, String(accessToken), String(refreshToken), "Manager Added to DB Successfully", httpStatusCodes_1.HttptatusCode.CREATED, savedManager);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'MaangerAlreadyExist') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.CONFLICT, "Manager Already Exist");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    managerLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const loginManager = yield this.managerAuthServices.managerLogin(data);
                const accessToken = yield this.jwtService.createToken(loginManager === null || loginManager === void 0 ? void 0 : loginManager._id, String(loginManager === null || loginManager === void 0 ? void 0 : loginManager.role));
                const refreshToken = yield this.jwtService.createRefreshToken(loginManager === null || loginManager === void 0 ? void 0 : loginManager._id, String(loginManager === null || loginManager === void 0 ? void 0 : loginManager.role));
                (0, responseHelpers_1.sendAuthResponse)(res, String(accessToken), String(refreshToken), "Manager Logged Successfully", httpStatusCodes_1.HttptatusCode.CREATED, loginManager);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === "InvalidCredentials") {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.UNAUTHORIZED, "Invalid Credentials");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    managerLogout(req, res) {
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
                    .send({ success: true, message: "Manager Logged out successfully" });
            }
            catch (error) {
                console.log('logout error: ', error);
                return;
            }
        });
    }
}
exports.default = ManagerAuthController;
exports.managerAuthController = new ManagerAuthController(auth_services_1.managerAuthServices);
