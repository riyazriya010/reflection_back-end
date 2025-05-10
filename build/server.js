"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${process.cwd()}/.env` }); // Getting Current Working Directory
const express_1 = __importDefault(require("express"));
const contants_1 = require("./utils/contants");
const dbConfig_1 = require("./config/dbConfig");
const employee_routes_1 = require("./routes/employee.routes");
const manager_routes_1 = require("./routes/manager.routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: contants_1.CLIENT_PORT,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
(0, dbConfig_1.connectDB)();
app.get('/', (req, res) => {
    res.send('Hello World Riyas');
});
app.use('/api/employee', employee_routes_1.employeeRoutes);
app.use('/api/manager', manager_routes_1.managerRoutes);
app.listen(contants_1.PORT, (err) => {
    if (err)
        throw err;
    console.log(`SERVER STARTED http://localhost:${contants_1.PORT}`);
});
