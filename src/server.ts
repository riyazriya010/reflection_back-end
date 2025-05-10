import dotenv from 'dotenv';
dotenv.config({path: `${process.cwd()}/.env`});  // Getting Current Working Directory
import express, { Request, Response } from 'express';
import { CLIENT_PORT, PORT } from './utils/contants';
import { connectDB } from './config/dbConfig';
import { employeeRoutes } from './routes/employee.routes';
import { managerRoutes } from './routes/manager.routes';
import cors from 'cors';



const app = express();
app.use(express.json());

const corsOptions = {
  origin: CLIENT_PORT,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

connectDB();

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World Riyas');
});

app.use('/api/employee', employeeRoutes)
app.use('/api/manager', managerRoutes)

app.listen(PORT, (err) => {
  if(err) throw err
  console.log(`SERVER STARTED http://localhost:${PORT}`);
})

