import React from 'react';
import './Home.scss';
import Dashboard from '../components/Dashboard';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <Dashboard />
    </div>
  );
};

export default Home;