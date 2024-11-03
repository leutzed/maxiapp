import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";

export const isAuthenticated = (req: Request, _: Response, next: NextFunction) => {
    const maxiCookie = req.session.maxiCookie;

    // TODO: Add more security
    if (!maxiCookie) {
        throw new UnauthorizedError();
    }

    next();
}