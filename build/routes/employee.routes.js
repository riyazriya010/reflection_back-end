"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/employee/auth.controller");
const feedback_controller_1 = require("../controllers/employee/feedback.controller");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const blacklistToken_1 = __importDefault(require("../middleware/blacklistToken"));
const router = express_1.default.Router();
router
    .post('/signup', auth_controller_1.employeeAuthController.employeeSignUp.bind(auth_controller_1.employeeAuthController))
    .post('/login', auth_controller_1.employeeAuthController.employeeLogin.bind(auth_controller_1.employeeAuthController))
    .post('/logout', auth_controller_1.employeeAuthController.employeeLogout.bind(auth_controller_1.employeeAuthController))
    .get('/get/details', blacklistToken_1.default, verifyToken_1.default, auth_controller_1.employeeAuthController.getEmployee.bind(auth_controller_1.employeeAuthController));
router
    .post('/send/request', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.requestFeedback.bind(feedback_controller_1.employeeFeedbackController))
    .get('/requestedFeedback', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.requestedFeedback.bind(feedback_controller_1.employeeFeedbackController))
    .get('/get/others/requested', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.getOthersRequested.bind(feedback_controller_1.employeeFeedbackController))
    .get('/get/allforms', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.getAllForm.bind(feedback_controller_1.employeeFeedbackController))
    .post('/submit/feedback', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.submitFeedback.bind(feedback_controller_1.employeeFeedbackController))
    .get('/get/others-all/requested', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.getAllRequestedToMe.bind(feedback_controller_1.employeeFeedbackController))
    .patch('/reject/request', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.rejectRequest.bind(feedback_controller_1.employeeFeedbackController))
    .get('/get/my/requeste', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.getMyRequestes.bind(feedback_controller_1.employeeFeedbackController))
    .get('/get/feedback/messages', blacklistToken_1.default, verifyToken_1.default, feedback_controller_1.employeeFeedbackController.getFeedbackMessages.bind(feedback_controller_1.employeeFeedbackController));
exports.employeeRoutes = router;
