setTimeout(() => {
    console.log('out');
}, 100000)
// const express = require('express');
// const axios = require('axios');
// const xml2js = require('xml2js');
// const session = require('express-session'); // Importando express-session

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // Configuração das sessões
// app.use(session({
//     secret: 'seu-segredo-aqui', // Substitua por uma string secreta
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Defina como true se estiver usando HTTPS
// }));

// // Função para converter XML para JSON
// const parseXML = (xml) => {
//     return new Promise((resolve, reject) => {
//         xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(result);
//         });
//     });
// };

// // Rota de login
// app.post('/api/login', async (req, res) => {
//   const { user, scode } = req.body;

//   try {
//       const response = await axios.get(`http://www.maxithlon.com/maxi-xml/login.php`, {
//           params: { user, scode },
//           withCredentials: true,
//       });

//       const jsonResponse = await parseXML(response.data);

//       if (jsonResponse['maxi-xml'].error) {
//           return res.status(401).json({ message: jsonResponse['maxi-xml'].error });
//       }

//       // Armazenar o ID do usuário e o cookie de sessão na sessão
//       req.session.userId = user;
//       const setCookieHeader = response.headers['set-cookie'];
//       if (setCookieHeader) {
//           // Armazenar o cookie de sessão na sessão do usuário
//           req.session.cookieValue = setCookieHeader[0]; // Armazena o primeiro cookie
//       }

//       return res.json({ message: jsonResponse['maxi-xml'].login });
//   } catch (error) {
//       return res.status(500).json({ error: 'Erro ao realizar login' });
//   }
// });

// // Rota para obter detalhes dos atletas
// app.get('/api/athletes', async (req, res) => {
//   const { teamid } = req.query;

//   try {
//       const userId = req.session.userId;
//       const idToUse = teamid || userId;
//       const cookieValue = req.session.cookieValue;

//       if (!cookieValue) {
//           return res.status(401).json({ message: 'Usuário não autenticado' });
//       }

//       const response = await axios.get(`http://www.maxithlon.com/maxi-xml/athletes.php`, {
//           params: { teamid: idToUse },
//           headers: {
//               Cookie: cookieValue // Enviar o cookie de sessão armazenado
//           },
//           withCredentials: true,
//       });

//       const jsonResponse = await parseXML(response.data);

//       if (jsonResponse['maxi-xml'].error) {
//           return res.status(400).json({ message: jsonResponse['maxi-xml'].error });
//       }

//       console.log(jsonResponse['maxi-xml'].athlete);
//       return res.json(jsonResponse['maxi-xml'].athlete);
//   } catch (error) {
//       return res.status(500).json({ error: 'Erro ao obter detalhes dos atletas' });
//   }
// });

// // Iniciar o servidor
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });