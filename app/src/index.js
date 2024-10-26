const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(session({
    secret: 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const parseXML = (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

app.get('/healthcheck', (_, res) => {
    console.log('OK');
    res.status(200).end();
});

app.post('/login', async (req, res) => {
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

app.get('/api/athletes', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});