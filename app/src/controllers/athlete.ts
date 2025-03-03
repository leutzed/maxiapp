import { Request, Response } from 'express';
import { parseXML } from '../utils/parser-xml.ts';
import MaxiResponse from '../interfaces/maxiResponse.ts';

export default class AthleteController {
    async findAthleteById(req: Request, res: Response): Promise<void> {
        const { athleteId } = req.params;

        try {
            if (!athleteId) {
                res.status(400).json({ message: 'athleteId é obrigatório' });
                return;
            }

            const headers = new Headers();
            headers.set('cookie', req.session.maxiCookie || '');

            const response = await fetch(`https://www.maxithlon.com/maxi-xml/athlete.php?athleteid=${athleteId}`, {
                method: "GET",
                headers: {
                    Cookie: req.session.maxiCookie || ''
                },
                credentials: 'include',
            });

            const jsonResponse = await parseXML<MaxiResponse>(await response.text());

            console.log(jsonResponse);
            
            if (jsonResponse['maxi-xml'].error) {
                res.status(400).json({ message: jsonResponse['maxi-xml'].error });
                return;
            }

            res.json(jsonResponse['maxi-xml']);
            return;
        } catch (err) {
            res.status(500).json({ message: 'Erro ao buscar dados do atleta' });
        }
    }
}