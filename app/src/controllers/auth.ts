import * as express from 'express';
import AuthBody from '../interfaces/auth.js';
import { parseXML } from '../utils/parser-xml.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import BadRequestError from '../errors/BadRequestError.js';

export default class AuthController {
    async auth(req: express.Request, res: express.Response): Promise<void> {
        const { user, scode } = req.body;

        if(!user || !scode){
            throw new BadRequestError({ message: 'Missing credentials' });
        }

        const authUrl = new URL(`http://www.maxithlon.com/maxi-xml/login.php`);
        authUrl.searchParams.append('user', user);
        authUrl.searchParams.append('scode', scode);

        try {
            const response = await fetch(authUrl, {
                method: 'GET',
                credentials: 'include'
            });

            const jsonResponse = await parseXML<AuthBody>(await response.text());

            if (jsonResponse['maxi-xml']?.error) {
                throw new UnauthorizedError({ message: jsonResponse['maxi-xml']?.error });
            }

            req.session.userId = user;
            const maxiCookie = response.headers.get('set-cookie');
            if (maxiCookie) {
                req.session.maxiCookie = maxiCookie;
            }

            res.status(200).send({ message: jsonResponse['maxi-xml'].login });
        } catch (err) {
            if (err instanceof UnauthorizedError) {
                throw err;
            }
            throw new Error('Authentication service unavailable');
        }
    }

    async logout(req: express.Request, res: express.Response): Promise<void> {
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
            }
        });
        res.clearCookie('connect.sid');
        res.status(200).end();
    }
}