import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
    if(err instanceof CustomError) {
        const { statusCode, errors, logging } = err;
        if(logging) {
            console.log(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack
            }, null, 2));
        }

        res.status(statusCode).send({ errors });
        return;
    }

    console.log(JSON.stringify(err, null, 2));
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
}