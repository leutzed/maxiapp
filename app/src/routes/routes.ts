import { Application } from 'express';

import athletesRouter from './athletes';
import healthcheckRouter from './healthcheck';
import authRouter from './auth';
import calendarRouter from './calendar';
import teamRouter from './team';

export default class Routes {
    setRoutes(APP: Application){
        APP.use('/athletes', athletesRouter);
        APP.use('/healthcheck', healthcheckRouter);
        APP.use('/auth', authRouter);
        APP.use('/calendar', calendarRouter);
        APP.use('/team', teamRouter);
    }
}
