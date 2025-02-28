import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/athletes.scss';

interface Athlete {
  id: string;
  name: string;
  age: number;
  position: string;
  team: string;
}

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchAthletes = async () => {
      try {
        const response = await axios.get('/athletes');
        setAthletes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching athletes:', err);
        setError('Failed to load athletes');
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="athletes-container">
      <div className="athletes-header">
        <h1>Athletes List</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      <div className="athletes-list">
        {athletes.length > 0 ? (
          athletes.map((athlete) => (
            <div key={athlete.id} className="athlete-card">
              <h3>{athlete.name}</h3>
              <p><strong>Age:</strong> {athlete.age}</p>
              <p><strong>Position:</strong> {athlete.position}</p>
              <p><strong>Team:</strong> {athlete.team}</p>
            </div>
          ))
        ) : (
          <p>No athletes found.</p>
        )}
      </div>
    </div>
  );
};

export default Athletes;