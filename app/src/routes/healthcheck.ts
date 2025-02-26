import Express, { Response } from 'express';

const healthcheckRouter = Express.Router();

healthcheckRouter.get('/', (_, res: Response) => {
    res.status(200).end();
});

export default healthcheckRouter;