import * as express from 'express';

import AuthBody from '../interfaces/auth.js';
import { parseXML } from '../utils/parser-xml.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export default class AuthController {
    async auth(req: express.Request, res: express.Response): Promise<void> {
        const { user, scode } = req.body;

        if(!user || !scode){
            // TODO: Must throw an error
            res.status(400).end();
            return;
        }

        const authUrl = new URL(`http://www.maxithlon.com/maxi-xml/login.php`);
        authUrl.searchParams.append('user', user);
        authUrl.searchParams.append('scode', scode);

        let response: globalThis.Response | undefined = undefined;
        let jsonResponse: AuthBody | undefined = undefined;
        try {
            response = await fetch(authUrl, {
                method: 'GET',
                credentials: 'include'
            });

            jsonResponse = await parseXML<AuthBody>(await response.text());
        } catch (err) {
            // TODO: Improve catch
            throw new Error('Something went wrong');
        }

        if (jsonResponse['maxi-xml']?.error) {
            throw new UnauthorizedError({ message: jsonResponse['maxi-xml']?.error });
        }

        req.session.userId = user;
        const maxiCookie = response.headers.get('set-cookie');
        if (maxiCookie) {
            req.session.maxiCookie = maxiCookie;
        }

        res.status(200).send({ message: jsonResponse['maxi-xml'].login });
    }
}