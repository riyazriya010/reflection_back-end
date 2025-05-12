import express from "express"
import { managerAuthController } from "../controllers/manager/auth.controller"
import { managerFeedbackController } from "../controllers/manager/feedback.controller"
import authenticateToken from "../middleware/verifytoken"
import authenticateBlackList from "../middleware/blacklistToken"


const router = express.Router()

router
.post('/signup',managerAuthController.managerSignUp.bind(managerAuthController))
.post('/login',managerAuthController.managerLogin.bind(managerAuthController))
.post('/logout',managerAuthController.managerLogout.bind(managerAuthController))

router
.get('/get/employees/feedbacks',authenticateBlackList, authenticateToken, managerFeedbackController.getEmployeesFeedback.bind(managerFeedbackController))


export const managerRoutes = router



