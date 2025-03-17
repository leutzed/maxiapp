import React from 'react';
import LoginForm from '../components/LoginForm';
import './Login.scss';

const Login: React.FC = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default Login;