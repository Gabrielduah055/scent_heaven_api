import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectAdmin from './config/admin_db';
import adminRouter from './route/adminRoute';





const app:Express = express();
const PORT = process.env.PORT || 3000;
connectAdmin()

// app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => { 
  res.send('Hello World!');
});

app.use('/api/admin', adminRouter)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});