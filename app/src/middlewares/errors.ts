import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
    if(err instanceof CustomError) {
        const { statusCode, errors, logging } = err;
        if(logging) {
            // Using structured error logging
            const errorLog = {
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack
            };
            process.env.NODE_ENV !== 'production' && console.error(errorLog);
        }

        res.status(statusCode).send({ errors });
        return;
    }

    // Only log internal errors in non-production
    process.env.NODE_ENV !== 'production' && console.error(err);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
}