import {Router} from 'express';
import {loginAdmin, logoutAdmin} from '../adminControllers/adminLogin';


const adminRouter = Router();

//posting login route
adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout', logoutAdmin);


export default adminRouter;

