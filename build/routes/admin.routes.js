"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin/admin");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const blacklistToken_1 = __importDefault(require("../middleware/blacklistToken"));
const router = express_1.default.Router();
router
    .post('/login', admin_1.adminController.login.bind(admin_1.adminController))
    .post('/create/form', blacklistToken_1.default, verifyToken_1.default, admin_1.adminController.createForm.bind(admin_1.adminController))
    .post('/logout', admin_1.adminController.adminLogout.bind(admin_1.adminController));
exports.adminRoutes = router;
