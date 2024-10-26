import Express from 'express';

const healthcheckRouter = Express.Router();

healthcheckRouter.get('/', (_, res) => {
    console.log('OK');
    res.status(200).end();
});

export default healthcheckRouter;