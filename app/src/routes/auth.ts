import Express from 'express';
import AuthController from '../controllers/auth';
import { isAuthenticated } from '../middlewares/auth';

const authRouter = Express.Router();
const controller = new AuthController();

authRouter.post('/', controller.auth);
authRouter.get('/check', isAuthenticated, (_, res) => res.status(200).end());
authRouter.post('/logout', isAuthenticated, controller.logout);

export default authRouter;