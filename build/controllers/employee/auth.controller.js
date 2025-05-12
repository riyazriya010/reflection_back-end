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
exports.employeeAuthController = void 0;
const auth_services_1 = require("../../services/employee/auth.services");
const jwt_1 = require("../../integrations/jwt");
const getId_1 = __importDefault(require("../../integrations/getId"));
const responseHelpers_1 = require("../../utils/responseHelpers");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
class EmployeeAuthController {
    constructor(employeeAuthServices) {
        this.employeeAuthServices = employeeAuthServices;
        this.jwtService = new jwt_1.JwtService();
    }
    employeeSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const savedEmployee = yield this.employeeAuthServices.employeeSignup(data);
                const accessToken = yield this.jwtService.createToken(savedEmployee === null || savedEmployee === void 0 ? void 0 : savedEmployee._id, String(savedEmployee === null || savedEmployee === void 0 ? void 0 : savedEmployee.role));
                const refreshToken = yield this.jwtService.createRefreshToken(savedEmployee === null || savedEmployee === void 0 ? void 0 : savedEmployee._id, String(savedEmployee === null || savedEmployee === void 0 ? void 0 : savedEmployee.role));
                (0, responseHelpers_1.sendAuthResponse)(res, String(accessToken), String(refreshToken), "Employee Added to DB Successfully", httpStatusCodes_1.HttptatusCode.CREATED, savedEmployee);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'EmployeeAlreadyExist') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.CONFLICT, "Employee Already Exist");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    employeeLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const login = yield this.employeeAuthServices.employeeLogin(data);
                const accessToken = yield this.jwtService.createToken(login === null || login === void 0 ? void 0 : login._id, String(login === null || login === void 0 ? void 0 : login.role));
                const refreshToken = yield this.jwtService.createRefreshToken(login === null || login === void 0 ? void 0 : login._id, String(login === null || login === void 0 ? void 0 : login.role));
                (0, responseHelpers_1.sendAuthResponse)(res, String(accessToken), String(refreshToken), "Employee Logged Successfully", httpStatusCodes_1.HttptatusCode.OK, login);
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
    getEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeId = yield (0, getId_1.default)('accessToken', req);
                const getEmployees = yield this.employeeAuthServices.getEmployees(employeeId);
                (0, responseHelpers_1.sendDataResponse)(res, 'All Employees Got', getEmployees, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                // if (error instanceof Error) {
                //     if (error.name === "NotEmployeesFound") {
                //         sendErrorResponse(res, HttptatusCode.NOT_FOUND, "Not Employees Found")
                //         return
                //     }
                // }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    employeeLogout(req, res) {
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
                    .send({ success: true, message: "Logged out successfully" });
            }
            catch (error) {
                console.log('logout error: ', error);
                return;
            }
        });
    }
}
exports.default = EmployeeAuthController;
exports.employeeAuthController = new EmployeeAuthController(auth_services_1.employeeAuthServices);
