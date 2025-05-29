import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginForm.scss';

const LoginForm: React.FC = () => {
  const [user, setUser] = useState('');
  const [scode, setScode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncingAthletes, setSyncingAthletes] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Usar o método login do contexto de autenticação
      await login(user, scode);
      
      // Mostra o loader de sincronização
      setLoading(false);
      setSyncingAthletes(true);
      
      // Simulação de progresso (opcional)
      const progressInterval = setInterval(() => {
        setSyncProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress; // Limitamos a 90% pois o 100% será quando a sincronização terminar
        });
      }, 500);
      
      // Após login bem-sucedido, chama a rota de sincronização de atletas
      try {
        const syncResponse = await fetch('/athletes/sync', {
          method: 'GET',
          credentials: 'include'
        });
        
        clearInterval(progressInterval);
        setSyncProgress(100);
        
        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          console.log('Athletes sync successful:', syncData);
          
          // Aguarda um breve momento para mostrar que está 100% completo
          setTimeout(() => {
            // Redirect to home page after successful sync
            navigate('/home');
          }, 300);
        } else {
          setSyncingAthletes(false);
          setError('Athlete synchronization failed. Redirecting...');
          console.error('Athletes sync failed');
          
          // Mesmo com falha, redireciona após um tempo
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      } catch (syncErr) {
        clearInterval(progressInterval);
        setSyncingAthletes(false);
        setError('Error during synchronization. Redirecting...');
        console.error('Error during athletes sync:', syncErr);
        
        // Mesmo com erro, redireciona após um tempo
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        {syncingAthletes ? (
          <div className="sync-loading-container">
            <h2>Synchronizing Athletes</h2>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${syncProgress}%` }}
              ></div>
            </div>
            <div className="sync-skeleton">
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
            </div>
            <p>Please wait while we synchronize the data...</p>
          </div>
        ) : (
          <>
            <h2>Login to Maxiapp</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="user">Username</label>
                <input
                  type="text"
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="scode">Security Code</label>
                <input
                  type="password"
                  id="scode"
                  value={scode}
                  onChange={(e) => setScode(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="login-footer">
              <p>Maxiapp - Your Maxithlon Companion</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;