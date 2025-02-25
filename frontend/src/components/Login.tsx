import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [scode, setScode] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (user && scode) {
      await login({ user, scode });
    }
  };

  return (
    <div className="login-container">
      <h2>Login Maxithlon</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user">Usuário:</label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="scode">Código de Segurança:</label>
          <input
            type="password"
            id="scode"
            value={scode}
            onChange={(e) => setScode(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;