import Express from 'express';
import axios from 'axios';

const athletesRouter = Express.Router();

athletesRouter.get('/', async (req, res) => {
    const { teamid } = req.query;

    try {
        const userId = req.session.userId;
        const idToUse = teamid || userId;
        const cookieValue = req.session.cookieValue;

        if (!cookieValue) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const response = await axios.get(`http://www.maxithlon.com/maxi-xml/athletes.php`, {
            params: { teamid: idToUse },
            headers: {
                Cookie: cookieValue
            },
            withCredentials: true,
        });

        const jsonResponse = await parseXML(response.data);

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