import express from "express"
import { employeeAuthController } from "../controllers/employee/auth.controller"


const router = express.Router()

router
.post('/signup',employeeAuthController.employeeSignUp.bind(employeeAuthController))
.post('/login',employeeAuthController.employeeLogin.bind(employeeAuthController))


export const employeeRoutes = router

