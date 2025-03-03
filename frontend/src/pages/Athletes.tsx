import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/athletes.scss';

interface Athlete {
  athleteId: string;
  name: string;
  age: number;
  position: string;
  team: string;
  specialtyId: {
    _: string;
  };
}

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Reset fetchedRef when component unmounts and remounts
    return () => {
      fetchedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchAthletes = async () => {
      // Avoid duplicate API calls in the same component mount
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      setLoading(true);
      try {
        // Add cache busting parameter and specify Accept header
        const response = await axios.get('/athletes', { 
          headers: { 
            'Cache-Control': 'no-cache',
            'Accept': 'application/json' 
          },
          params: { t: new Date().getTime() } // Cache busting
        });
        
        // Ensure we're parsing the response correctly
        const athletesData = Array.isArray(response.data) ? response.data : [];
        setAthletes(athletesData);
        console.log('Athletes data:', athletesData);
        
      } catch (err) {
        console.error('Error fetching athletes:', err);
        setError('Failed to load athletes');
        // Check if the error is authentication related and redirect if needed
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [isAuthenticated, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const groupAthletesBySpecialty = () => {
    const grouped: { [key: string]: Athlete[] } = {};
    
    if (athletes && athletes.length > 0) {
      athletes.forEach((athlete) => {
        const specialty = athlete.specialtyId?._ || 'Unknown';
        if (!grouped[specialty]) {
          grouped[specialty] = [];
        }
        grouped[specialty].push(athlete);
      });
    }
    
    return grouped;
  };

  if (loading) return <div className="loading">Loading...</div>;
  
  const athletesBySpecialty = groupAthletesBySpecialty();
  const hasAthletes = athletes && athletes.length > 0;

  return (
    <div className="athletes-container">
      <div className="athletes-header">
        <h1>Athletes List</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      
      {hasAthletes ? (
        Object.entries(athletesBySpecialty).map(([specialty, specialtyAthletes]) => (
          <div key={specialty} className="specialty-table-container">
            <h2 className="specialty-title">Especialidade: {specialty}</h2>
            <table className="athletes-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Posição</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {specialtyAthletes.map((athlete) => (
                  <tr key={athlete.athleteId} className="athlete-row">
                    <td>
                      <Link to={`/athlete/${athlete.athleteId}`}>{athlete.name}</Link>
                    </td>
                    <td>{athlete.age}</td>
                    <td>{athlete.position}</td>
                    <td>{athlete.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No athletes found.</p>
      )}
    </div>
  );
};

export default Athletes;