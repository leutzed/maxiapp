import Express from 'express';
import axios from 'axios';

const authRouter = Express.Router();

authRouter.post('/', async (req, res) => {
    const { user, scode } = req.body;

    if(!user || !scode){
        return res.status(400).end();
    }

    try {
        const response = await axios.get(`http://www.maxithlon.com/maxi-xml/login.php`, {
            params: { user, scode },
            withCredentials: true,
        });

        const jsonResponse = await parseXML(response.data);

        if (jsonResponse['maxi-xml'].error) {
            return res.status(401).json({ message: jsonResponse['maxi-xml'].error });
        }

        req.session.userId = user;
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
            req.session.cookieValue = setCookieHeader[0];
        }

        return res.json({ message: jsonResponse['maxi-xml'].login });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao realizar login' });
    }
});

export default authRouter;