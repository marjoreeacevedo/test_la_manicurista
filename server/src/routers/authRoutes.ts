import  { Router } from 'express';

import {authController} from '../controllers/authController';

class UserRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/auth/login', authController.login);
        this.router.post('/auth/register',authController.register);

    }
}

const userRoutes=new UserRoutes();
export default userRoutes.router;
