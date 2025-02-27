import Express, { Application } from 'express';
import cors from 'cors';
import Routes from './routes/routes.ts';
import session from 'express-session';
import { errorHandler } from './middlewares/errors.ts';

class App {
    public app: Application;

    constructor() {
        this.app = Express();
        this.config();
    }

    private config(): void {
        this.app.use(cors());

        this.app.use(Express.json());
        this.app.use(session({
            secret: 'empty',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));

        (new Routes()).setRoutes(this.app);

        this.app.use(errorHandler);
    }
}


export default new App().app;
