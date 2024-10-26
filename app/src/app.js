import Express from 'express';
import cors from 'cors';
import session from 'express-session';
import Routes from './routes/routes.js';

let APP = Express();

APP.use(cors());

APP.use(Express.json());
APP.use(session({
    secret: process.env.SESSION_SECRET || 'empty',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

(new Routes()).setRoutes(APP);

export default APP;
