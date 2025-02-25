import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Bem-vindo ao Maxithlon App</h1>
      <p>Este aplicativo permite visualizar informações do jogo Maxithlon.</p>
      
      <div className="home-links">
        <Link to="/athletes" className="home-link">
          <div className="home-card">
            <h2>Atletas</h2>
            <p>Visualize todos os seus atletas e suas estatísticas.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;