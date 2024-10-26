import { parseXML } from '../utils/parser-xml.js';

export default class AuthController {
    async auth(req, res){
        const { user, scode } = req.body;

        if(!user || !scode){
            return res.status(400).end();
        }

        try {
            const response = await fetch(`http://www.maxithlon.com/maxi-xml/login.php`, {
                method: 'GET',
                params: { user, scode },
                credentials: 'include'
            });

            const jsonResponse = await parseXML(await response.text());
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
            console.log(error.message);
            return res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
}