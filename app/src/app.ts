import Express, { Application } from 'express';
import cors from 'cors';
import Routes from './routes/routes.ts';
import session from 'express-session';
import { errorHandler } from './middlewares/errors.ts';
import path from 'path';

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

        // Set API routes
        (new Routes()).setRoutes(this.app);
        
        // Error handling middleware
        this.app.use(errorHandler);

        // In production, serve the React app for all unmatched routes
        if (process.env.NODE_ENV === 'production') {
            const distPath = path.join(__dirname, '../../frontend/dist');
            this.app.use(Express.static(distPath));
            
            // For any routes not matched by API or static files, serve the index.html
            this.app.get('*', (req, res) => {
                res.sendFile(path.join(distPath, 'index.html'));
            });
        }
    }
}

export default new App().app;