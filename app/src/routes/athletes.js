import Express from 'express';
import AthletesController from '../controllers/athletes.js';

const athletesRouter = Express.Router();
const controller = new AthletesController();

athletesRouter.get('/', controller.findByTeamId);

export default athletesRouter;