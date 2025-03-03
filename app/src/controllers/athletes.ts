import { Request, Response } from 'express';
import { parseXML } from '../utils/parser-xml.ts';
import MaxiResponse from '../interfaces/maxiResponse.ts';

export default class AthletesController {
    async findByTeamId(req: Request, res: Response): Promise<void> {
        try {
            const headers = new Headers();
            headers.set('cookie', req.session.maxiCookie || '');

            const response = await fetch(`https://www.maxithlon.com/maxi-xml/athletes.php`, {
                method: "POST",
                headers: {
                    Cookie: req.session.maxiCookie || ''
                },
                credentials: 'include',
            });

            const jsonResponse = await parseXML<MaxiResponse>(await response.text());
            
            if (jsonResponse['maxi-xml'].error) {
                res.status(400).json({ message: jsonResponse['maxi-xml'].error });
                return;
            }

            // Ensure we're returning an array even if there's only one athlete
            const athletes = Array.isArray(jsonResponse['maxi-xml'].athlete) 
                ? jsonResponse['maxi-xml'].athlete 
                : jsonResponse['maxi-xml'].athlete ? [jsonResponse['maxi-xml'].athlete] : [];
            
            res.json(athletes);
            return;
        } catch (err) {
            console.error('Error in findByTeamId:', err);
            res.status(500).json({ message: 'Error fetching athletes data' });
        }
    }
}