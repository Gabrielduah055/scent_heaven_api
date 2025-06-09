import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectAdmin from './config/admin_db';
import adminRouter from './route/adminRoute';
import cors from 'cors';




const app:Express = express();
const PORT = process.env.PORT || 3000;
connectAdmin()

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.get('/', (req: Request, res: Response) => { 
  res.send('Hello World!');
});

app.use('/api/admin', adminRouter)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});