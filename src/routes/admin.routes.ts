import express from "express"
import { adminController } from "../controllers/admin/admin"
import authenticateToken from "../middleware/verifyToken"
import authenticateBlackList from "../middleware/blacklistToken"

const router = express.Router()

router
.post('/login',adminController.login.bind(adminController))

.post('/create/form',authenticateBlackList, authenticateToken, adminController.createForm.bind(adminController))
.post('/logout', adminController.adminLogout.bind(adminController))


export const adminRoutes = router
