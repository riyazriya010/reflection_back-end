import express from "express"
import { managerAuthController } from "../controllers/manager/auth.controller"


const router = express.Router()

router
.post('/signup',managerAuthController.managerSignUp.bind(managerAuthController))
.post('/login',managerAuthController.managerLogin.bind(managerAuthController))


export const managerRoutes = router



