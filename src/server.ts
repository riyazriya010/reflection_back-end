import dotenv from 'dotenv';
dotenv.config({path: `${process.cwd()}/.env`});  // Getting Current Working Directory
import express from 'express';
import { CLIENT_PORT, PORT } from './utils/contants';
import { connectDB } from './config/dbConfig';
import { employeeRoutes } from './routes/employee.routes';
import { managerRoutes } from './routes/manager.routes';
import { adminRoutes } from './routes/admin.routes';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import "./utils/scheduler"



const app = express();


connectDB();

const corsOptions = {
  origin: CLIENT_PORT,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/employee', employeeRoutes)
app.use('/api/manager', managerRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, (err) => {
  if(err) throw err
  console.log(`SERVER STARTED http://localhost:${PORT}`);
})

