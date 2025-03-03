// filepath: /mnt/c/Users/leutz/Documents/maxiapp/app/src/routes/athlete.ts
import Express from 'express';
import AthleteController from '../controllers/athlete.ts';
import { isAuthenticated } from '../middlewares/auth.ts';

const athleteRouter = Express.Router();
const controller = new AthleteController();

athleteRouter.get('/:athleteId', isAuthenticated, controller.findAthleteById);

export default athleteRouter;