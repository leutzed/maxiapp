import { Request, Response } from 'express';
import { parseXML } from '../utils/parser-xml';
import { Calendar } from '../interfaces/calendar';

export default class CalendarController {
    async getDate(req: Request, res: Response): Promise<void> {
        try {
            const headers = new Headers();
            headers.set('cookie', req.session.maxiCookie || '');

            const response = await fetch(`https://www.maxithlon.com/maxi-xml/calendar.php`, {
                method: "GET", // This should be a GET request
                headers: {
                    Cookie: req.session.maxiCookie || ''
                },
                credentials: 'include',
            });

            const jsonResponse = await parseXML<Calendar>(await response.text());
            // TODO: Create this interface
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