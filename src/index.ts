import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectAdmin from './config/admin_db';





const app:Express = express();
connectAdmin()


app.get('/', (req: Request, res: Response) => { 
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});