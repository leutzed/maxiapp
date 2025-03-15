import Express from 'express';

import TeamController from '../controllers/team.ts';
import { isAuthenticated } from '../middlewares/auth.ts';

const teamRouter = Express.Router();
const controller = new TeamController();

teamRouter.get('/', isAuthenticated, controller.getTeam);

export default teamRouter;