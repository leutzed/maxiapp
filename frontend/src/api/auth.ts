import api from './axios';
import { AuthCredentials, AuthResponse } from '../types/auth';

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth', credentials);
  return response.data;
};

export const logout = (): void => {
  // Como a autenticação é baseada em sessão no servidor,
  // podemos apenas limpar o estado local
  localStorage.removeItem('isAuthenticated');
};