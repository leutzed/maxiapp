import Express from 'express';

import AthletesController from '../controllers/athletes.ts';
import { isAuthenticated } from '../middlewares/auth.ts';

const athletesRouter = Express.Router();
const controller = new AthletesController();

athletesRouter.get('/', isAuthenticated, controller.findAll);
athletesRouter.get('/sync', isAuthenticated, controller.syncAthletes);
athletesRouter.get('/:id', isAuthenticated, controller.findOne);
athletesRouter.get('/:id/history', isAuthenticated, controller.getHistory);

export default athletesRouter;