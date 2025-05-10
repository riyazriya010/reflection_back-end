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
exports.employeeAuthController = void 0;
const auth_services_1 = require("../../services/employee/auth.services");
class EmployeeAuthController {
    constructor(employeeAuthServices) {
        this.employeeAuthServices = employeeAuthServices;
    }
    employeeSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const savedEmployee = yield this.employeeAuthServices.employeeSignup(data);
                return res.status(201).send({ message: "Employee Saved to DB", success: true, result: savedEmployee });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'EmployeeAlreadyExist') {
                        res.status(409).send({ message: "Employee Already Exist", success: false });
                        return;
                    }
                }
            }
        });
    }
    employeeLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const login = yield this.employeeAuthServices.employeeLogin(data);
                return res.status(200).send({ message: "Employee Found", success: true, result: login });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === "InvalidCredentials") {
                        return res.status(401).send({ message: "Invalid Credentials", success: false });
                    }
                }
            }
        });
    }
}
exports.default = EmployeeAuthController;
exports.employeeAuthController = new EmployeeAuthController(auth_services_1.employeeAuthServices);
