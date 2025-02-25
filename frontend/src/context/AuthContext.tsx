import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/auth';
import { AuthCredentials } from '../types/auth';

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se o usuário está autenticado ao iniciar a aplicação
    const checkAuth = async () => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: AuthCredentials): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiLogin(credentials);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } catch (err: any) {
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      if (err.response?.data?.errors?.[0]?.message) {
        errorMessage = err.response.data.errors[0].message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    apiLogout();
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};