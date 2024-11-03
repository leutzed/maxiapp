import Express from 'express';

import AthletesController from '../controllers/athletes.ts';
import { isAuthenticated } from '../middlewares/auth.ts';

const athletesRouter = Express.Router();
const controller = new AthletesController();

athletesRouter.get('/', isAuthenticated, controller.findByTeamId);

export default athletesRouter;