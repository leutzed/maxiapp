declare module 'express-session' {
    interface SessionData {
        maxiCookie: string,
        userId: string
    }
}

export {};