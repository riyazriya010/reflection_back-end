"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/manager/auth.controller");
const feedback_controller_1 = require("../controllers/manager/feedback.controller");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const blacklistToken_1 = __importDefault(require("../middleware/blacklistToken"));
const router = express_1.default.Router();
router
    .post('/signup', auth_controller_1.managerAuthController.managerSignUp.bind(auth_controller_1.managerAuthController))
    .post('/login', auth_controller_1.managerAuthController.managerLogin.bind(auth_controller_1.managerAuthController))
    .post('/logout', auth_controller_1.managerAuthController.managerLogout.bind(auth_controller_1.managerAuthController));
router
    .get('/get/employees/feedbacks', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.managerFeedbackController.getEmployeesFeedback.bind(feedback_controller_1.managerFeedbackController));
exports.managerRoutes = router;
