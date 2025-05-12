import express from "express"
import { employeeAuthController } from "../controllers/employee/auth.controller"
import { employeeFeedbackController } from "../controllers/employee/feedback.controller"
import authenticateToken from "../middleware/verifyToken"
import authenticateBlackList from "../middleware/blacklistToken"


const router = express.Router()

router
.post('/signup',employeeAuthController.employeeSignUp.bind(employeeAuthController))
.post('/login',employeeAuthController.employeeLogin.bind(employeeAuthController))
.post('/logout',employeeAuthController.employeeLogout.bind(employeeAuthController))
.get('/get/details',authenticateBlackList, authenticateToken, employeeAuthController.getEmployee.bind(employeeAuthController))

router
.post('/send/request',authenticateBlackList, authenticateToken, employeeFeedbackController.requestFeedback.bind(employeeFeedbackController))
.get('/requestedFeedback',authenticateBlackList, authenticateToken, employeeFeedbackController.requestedFeedback.bind(employeeFeedbackController))
.get('/get/others/requested',authenticateBlackList, authenticateToken, employeeFeedbackController.getOthersRequested.bind(employeeFeedbackController))
.get('/get/allforms',authenticateBlackList, authenticateToken, employeeFeedbackController.getAllForm.bind(employeeFeedbackController))
.post('/submit/feedback',authenticateBlackList, authenticateToken, employeeFeedbackController.submitFeedback.bind(employeeFeedbackController))
.get('/get/others-all/requested',authenticateBlackList, authenticateToken, employeeFeedbackController.getAllRequestedToMe.bind(employeeFeedbackController))
.patch('/reject/request',authenticateBlackList, authenticateToken, employeeFeedbackController.rejectRequest.bind(employeeFeedbackController))
.get('/get/my/requeste',authenticateBlackList, authenticateToken, employeeFeedbackController.getMyRequestes.bind(employeeFeedbackController))
.get('/get/feedback/messages',authenticateBlackList, authenticateToken, employeeFeedbackController.getFeedbackMessages.bind(employeeFeedbackController))



export const employeeRoutes = router

