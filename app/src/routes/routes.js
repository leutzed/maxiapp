import athletesRouter from './athletes.js';
import healthcheckRouter from './healthcheck.js';
import authRouter from './auth.js';

export default class Routes {
    setRoutes(APP){
        APP.use('/athletes', athletesRouter);
        APP.use('/healthcheck', healthcheckRouter);
        APP.use('/auth', authRouter);
    }
}
