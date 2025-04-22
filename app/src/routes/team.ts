import Express from 'express';

import TeamController from '../controllers/team';
import { isAuthenticated } from '../middlewares/auth';

const teamRouter = Express.Router();
const controller = new TeamController();

teamRouter.get('/', isAuthenticated, controller.getTeam);

export default teamRouter;