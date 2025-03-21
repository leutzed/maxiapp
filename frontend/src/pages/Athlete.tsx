import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AthleteCard from '../components/AthleteCard';
import './Athlete.scss';
import { Athlete as AthleteType } from '../interfaces/Athlete';

const Athlete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [athlete, setAthlete] = useState<AthleteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/athletes/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch athlete');
        }
        
        const data = await response.json();
        setAthlete(data);
      } catch (err) {
        console.error('Error fetching athlete:', err);
        setError(err instanceof Error ? err.message : 'Failed to load athlete data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAthlete();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/home');
  };

  if (loading) {
    return <div className="athlete-page loading">Loading...</div>;
  }

  if (error) {
    return <div className="athlete-page error">Error: {error}</div>;
  }

  if (!athlete) {
    return <div className="athlete-page">Athlete not found</div>;
  }

  return (
    <div className="athlete-page">
      <div className="athlete-header">
        <button onClick={handleBack} className="back-button">
          &larr; Back to List
        </button>
      </div>
      <AthleteCard athlete={athlete} />
    </div>
  );
};

export default Athlete;