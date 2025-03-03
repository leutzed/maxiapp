import { Application } from 'express';

import athletesRouter from './athletes.ts';
import athleteRouter from './athlete.ts';
import healthcheckRouter from './healthcheck.ts';
import authRouter from './auth.ts';
import calendarRouter from './calendar.ts';

export default class Routes {
    setRoutes(APP: Application){
        APP.use('/athlete', athleteRouter);
        APP.use('/athletes', athletesRouter);
        APP.use('/healthcheck', healthcheckRouter);
        APP.use('/auth', authRouter);
        APP.use('/calendar', calendarRouter);
    }
}
