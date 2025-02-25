import React, { useEffect, useState } from 'react';
import { getAthletesByTeamId } from '../api/athletes';
import { Athlete } from '../types/athlete';
import AthleteCard from './AthleteCard';

interface AthletesListProps {
  teamId?: string;
}

const AthletesList: React.FC<AthletesListProps> = ({ teamId }) => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true);
        const data = await getAthletesByTeamId(teamId);
        setAthletes(data);
        setError(null);
      } catch (err: any) {
        let errorMessage = 'Erro ao carregar atletas.';
        if (err.response?.data?.errors?.[0]?.message) {
          errorMessage = err.response.data.errors[0].message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [teamId]);

  if (loading) {
    return <div className="loading">Carregando atletas...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (athletes.length === 0) {
    return <div className="empty-message">Nenhum atleta encontrado.</div>;
  }

  return (
    <div className="athletes-grid">
      {athletes.map((athlete) => (
        <AthleteCard key={athlete.id} athlete={athlete} />
      ))}
    </div>
  );
};

export default AthletesList;