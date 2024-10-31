import Express from 'express';
import AthletesController from '../controllers/athletes.js';
import { isAuthenticated } from '../middlewares/auth.js';

const athletesRouter = Express.Router();
const controller = new AthletesController();

athletesRouter.get('/', isAuthenticated, controller.findByTeamId);

export default athletesRouter;