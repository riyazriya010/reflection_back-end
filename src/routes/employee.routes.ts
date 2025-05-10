import express from "express"
import { employeeAuthController } from "../controllers/employee/auth.controller"


const router = express.Router()

router
.post('/employee/signup',employeeAuthController.employeeSignUp.bind(employeeAuthController))
.post('/employee/login',employeeAuthController.employeeLogin.bind(employeeAuthController))
.post('/employee/logout',employeeAuthController.employeeLogout.bind(employeeAuthController))
.get('/employee/get/details',employeeAuthController.employeeLogout.bind(employeeAuthController))



export const employeeRoutes = router

