import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente utilitário que intercepta erros de autenticação em todas as requisições
 * e redireciona para a página de login quando necessário
 */
const AuthErrorHandler: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Intercepta todas as respostas de fetch para tratar erros de autenticação
    const originalFetch = window.fetch;
    
    window.fetch = async function(input, init) {
      try {
        const response = await originalFetch(input, init);
        
        // Se a resposta for um 401 (Unauthorized), redireciona para a página de login
        if (response.status === 401) {
          console.log('Sessão expirada ou usuário não autenticado. Redirecionando para login...');
          logout();
          navigate('/login');
        }
        
        return response;
      } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
      }
    };

    // Restaura o fetch original ao desmontar o componente
    return () => {
      window.fetch = originalFetch;
    };
  }, [navigate, logout]);

  return null; // Este componente não renderiza nada visualmente
};

export default AuthErrorHandler;