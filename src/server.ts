import dotenv from 'dotenv';
dotenv.config({path: `${process.cwd()}/.env`});  // Getting Current Working Directory
import express from 'express';
import { CLIENT_PORT, PORT } from './utils/contants';
import { connectDB } from './config/dbConfig';
import { employeeRoutes } from './routes/employee.routes';
import { managerRoutes } from './routes/manager.routes';
import cors from 'cors';
<<<<<<< HEAD
import morgan from 'morgan';
=======
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
>>>>>>> employee



const app = express();


connectDB();

const corsOptions = {
  origin: CLIENT_PORT,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
<<<<<<< HEAD
app.use(morgan('dev'))

connectDB();

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World Riyas');
});
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
>>>>>>> employee

app.use('/api/employee', employeeRoutes)
app.use('/api/manager', managerRoutes);

app.listen(PORT, (err) => {
  if(err) throw err
  console.log(`SERVER STARTED http://localhost:${PORT}`);
})

