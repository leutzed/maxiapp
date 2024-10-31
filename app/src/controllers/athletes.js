import { parseXML } from '../utils/parser-xml.js';

export default class AthletesController {
    async findByTeamId(req, res) {
        const { teamId } = req.query;

        try {
            const userId = req.session.userId;
            const response = await fetch(`http://www.maxithlon.com/maxi-xml/athletes.php`, {
                method: "POST",
                body: { teamid: teamId || userId },
                headers: {
                    Cookie: req.session.maxiCookie
                },
                credentials: 'include',
            });

            const jsonResponse = await parseXML(await response.text());
            if (jsonResponse['maxi-xml'].error) {
                return res.status(400).json({ message: jsonResponse['maxi-xml'].error });
            }

            return res.json(jsonResponse['maxi-xml'].athlete);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Erro ao obter detalhes dos atletas' });
        }
    }
}