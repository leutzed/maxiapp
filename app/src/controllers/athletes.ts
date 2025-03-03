import { Request, Response } from 'express';
import { parseXML } from '../utils/parser-xml.ts';
import { Athlete } from '../interfaces/athlete.ts';
import { Athletes } from '../interfaces/athletes.ts';

export default class AthletesController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const headers = new Headers();
            headers.set('cookie', req.session.maxiCookie || '');

            const response = await fetch(`https://www.maxithlon.com/maxi-xml/athletes.php`, {
                method: "POST", // This should be a GET request
                headers: {
                    Cookie: req.session.maxiCookie || ''
                },
                credentials: 'include',
            });

            const jsonResponse = await parseXML<Athletes>(await response.text());
            // TODO: Create this interface
            if (jsonResponse['maxi-xml'].error) {
                res.status(400).json({ message: jsonResponse['maxi-xml'].error });
                return;
            }

            res.json(jsonResponse['maxi-xml'].athlete);
            return;
        } catch (err) {
            throw new Error();
        }
    }

    async findAthleteById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const headers = new Headers();
            headers.set('cookie', req.session.maxiCookie || '');

            const response = await fetch(`https://www.maxithlon.com/maxi-xml/athlete.php?athleteid=${id}`, {
                method: "GET",
                headers: {
                    Cookie: req.session.maxiCookie || ''
                },
                credentials: 'include',
            });
            
            const jsonResponse = await parseXML<Athlete>(await response.text());
            
            if (jsonResponse['maxi-xml'].error) {
                res.status(400).json({ message: jsonResponse['maxi-xml'].error });
                return;
            }

            res.json(jsonResponse['maxi-xml']);
            return;
        } catch (err) {
            throw new Error();
        }
    }
}