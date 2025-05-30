import {Router} from 'express';
import {loginAdmin} from '../adminControllers/adminLogin';


const adminRouter = Router();

//posting login route
adminRouter.post('/login', loginAdmin);

export default adminRouter;

