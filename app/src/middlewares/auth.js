export const isAuthenticated = (req, res, next) => {
    const maxiCookie = req.session.maxiCookie;

    // TODO: Add more security
    if (!maxiCookie) {
        return res.status(401).json({ message: 'Usuário não autenticado' }).end();
    }

    next();
}