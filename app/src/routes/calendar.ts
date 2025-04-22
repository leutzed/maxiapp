import Express from 'express';

import CalendarController from '../controllers/calendar';
import { isAuthenticated } from '../middlewares/auth';

const calendarRouter = Express.Router();
const controller = new CalendarController();

calendarRouter.get('/', isAuthenticated, controller.getDate);

export default calendarRouter;