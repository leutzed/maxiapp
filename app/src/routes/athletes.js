import Express from 'express';
import { parseXML } from '../utils/parser-xml.js';

const athletesRouter = Express.Router();

athletesRouter.get('/', async (req, res) => {
    const { teamid } = req.query;
    if(!teamid){
        return res.status(400).end();
    }

    try {
        const userId = req.session.userId;
        const cookie = req.session.cookie;

        if (!cookieValue) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const response = await fetch.get(`http://www.maxithlon.com/maxi-xml/athletes.php`, {
            body: { teamid: teamid || userId },
            headers: {
                Cookie: cookie
            },
            credentials: 'include',
        });

        const jsonResponse = await parseXML(await response.text());
        if (jsonResponse['maxi-xml'].error) {
            return res.status(400).json({ message: jsonResponse['maxi-xml'].error });
        }

        console.log(jsonResponse['maxi-xml'].athlete);
        return res.json(jsonResponse['maxi-xml'].athlete);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter detalhes dos atletas' });
    }
});

export default athletesRouter;