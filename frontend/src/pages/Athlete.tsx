import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteCard from '../components/AthleteCard';
import './Athlete.scss';

const Athlete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [athlete, setAthlete] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Implementar chamada à API para buscar os dados do atleta
    // Por enquanto, usando dados mockados
    setAthlete({
      athleteId: id,
      name: "John",
      surname: "Doe",
      sex: "M",
      age: 25,
      nationId: "BR",
      maxid: "12345",
      form: 85,
      care: 90,
      experience: 75,
      mood: 95,
      strenght: 80,
      stamina: 85,
      speed: 88,
      agility: 87,
      jump: 82,
      throw: 79,
      specialty1: "Sprint",
      specialty2: "Hurdles",
      specialtyId: 1
    });
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="athlete-page loading">Loading...</div>;
  }

  if (!athlete) {
    return <div className="athlete-page">Athlete not found</div>;
  }

  return (
    <div className="athlete-page">
      <AthleteCard athlete={athlete} />
    </div>
  );
};

export default Athlete;