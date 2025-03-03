 import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/athletes.scss';

interface AthleteData {
  athleteId: string;
  name: string;
  age: number;
  position: string;
  team: string;
  specialtyId: {
    _: string;
  };
}

const Athlete = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [athlete, setAthlete] = useState<AthleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchAthlete = async () => {
      try {
        console.log('Fetching athlete...');
        
        const response = await axios.get(`/athlete/${id}`);
        setAthlete(response.data);
        console.log(response);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching athlete:', err);
        setError('Failed to load athlete data');
        setLoading(false);
      }
    };

    fetchAthlete();
  }, [id, isAuthenticated, navigate]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!athlete) return <div className="error-message">Athlete not found</div>;

  return (
    <div className="athlete-detail-container">
      <h1>{athlete.name}</h1>
      
      <div className="athlete-actions">
        <Link to="/athletes" className="back-button">Voltar para lista de atletas</Link>
      </div>
    </div>
  );
};

export default Athlete;