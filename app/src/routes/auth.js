import Express from 'express';
import AuthController from '../controllers/auth.js';

const authRouter = Express.Router();
const controller = new AuthController();

authRouter.post('/', controller.auth);

export default authRouter;