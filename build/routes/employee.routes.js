"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/employee/auth.controller");
const router = express_1.default.Router();
router
    .post('/employee/signup', auth_controller_1.employeeAuthController.employeeSignUp.bind(auth_controller_1.employeeAuthController))
    .post('/employee/login', auth_controller_1.employeeAuthController.employeeLogin.bind(auth_controller_1.employeeAuthController));
exports.employeeRoutes = router;
