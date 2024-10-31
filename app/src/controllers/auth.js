import { parseXML } from '../utils/parser-xml.js';

export default class AuthController {
    async auth(req, res){
        const { user, scode } = req.body;

        if(!user || !scode){
            return res.status(400).end();
        }

        try {
            const authUrl = new URL(`http://www.maxithlon.com/maxi-xml/login.php`);
            authUrl.searchParams.append('user', user);
            authUrl.searchParams.append('scode', scode);
            const response = await fetch(authUrl, {
                method: 'GET',
                credentials: 'include'
            });

            const jsonResponse = await parseXML(await response.text());
            if (jsonResponse['maxi-xml'].error) {
                return res.status(401).json({ message: jsonResponse['maxi-xml'].error });
            }

            req.session.userId = user;
            const maxiCookie = response.headers.get('set-cookie');
            if (maxiCookie) {
                req.session.maxiCookie = maxiCookie;
            }

            return res.json({ message: jsonResponse['maxi-xml'].login });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
}