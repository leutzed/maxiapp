import Express from 'express';

import CalendarController from '../controllers/calendar.ts';
import { isAuthenticated } from '../middlewares/auth.ts';

const calendarRouter = Express.Router();
const controller = new CalendarController();

calendarRouter.get('/', isAuthenticated, controller.getDate);

export default calendarRouter;