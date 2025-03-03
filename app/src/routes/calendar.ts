// filepath: /mnt/c/Users/leutz/Documents/maxiapp/app/src/routes/calendar.ts
import Express from 'express';
import CalendarController from '../controllers/calendar.ts';
import { isAuthenticated } from '../middlewares/auth.ts';

const calendarRouter = Express.Router();
const controller = new CalendarController();

calendarRouter.get('/', isAuthenticated, controller.getCalendar);

export default calendarRouter;