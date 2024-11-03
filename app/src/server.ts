import APP from './app.js';

const PORT = 3000;

APP.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});