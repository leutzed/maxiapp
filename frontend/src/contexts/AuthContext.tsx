import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../services/api';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (user: string, scode: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const isValid = await api.checkAuth();
            setIsAuthenticated(isValid);
        } catch (err) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (user: string, scode: string) => {
        await api.auth({ user, scode });
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await fetch('/auth/logout', { credentials: 'include' });
        } finally {
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}