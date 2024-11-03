import { Request, Response } from 'express';
import { parseXML } from '../utils/parser-xml.ts';

export default class AthletesController {
    async findByTeamId(req: Request, res: Response): Promise<void> {
        const { teamId } = req.query;

        try {
            const headers = new Headers();
            headers.set('cookie', req.session.maxiCookie || '');

            // TODO: Create a generic structure for API calls
            const body = {
                teamId: teamId || req.session.userId
            }
            console.log(body);
            const response = await fetch(`http://www.maxithlon.com/maxi-xml/athletes.php`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    Cookie: req.session.maxiCookie || ''
                },
                credentials: 'include',
            });

            const jsonResponse = await parseXML(await response.text());
            console.log(jsonResponse);
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
}