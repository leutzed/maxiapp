import Express, { Response, Request } from 'express';
import AuthController from '../controllers/auth.ts';
import { isAuthenticated } from '../middlewares/auth.ts';

const authRouter = Express.Router();
const controller = new AuthController();

authRouter.post('/', controller.auth);
// Nova rota para verificar o status da autenticação
authRouter.get('/check', isAuthenticated, (req: Request, res: Response) => {
  res.status(200).json({ 
    authenticated: true,
    user: req.session.userId 
  });
});

export default authRouter;