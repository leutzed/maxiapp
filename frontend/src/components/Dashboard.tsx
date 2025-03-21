import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import { Athlete } from '../interfaces/Athlete';

const Dashboard: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<number[]>([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await fetch('/athletes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch athletes');
        }
        
        const data = await response.json();
        setAthletes(data);
        
        // Extrair todas as especialidades únicas dos atletas
        const uniqueSpecialties = [...new Set(data.map((athlete: Athlete) => athlete.specialtyId))]
          .filter((id): id is number => typeof id === 'number')
          .sort((a, b) => a - b);
        
        setSpecialties(uniqueSpecialties);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load athletes');
        console.error('Error fetching athletes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAthletes();
  }, []);

  // Função para determinar o estilo de atributos baseado no valor
  const getStatStyle = (value: number) => {
    if (value >= 17) return { fontWeight: 'bold', color: '#008000' };
    if (value >= 10) return { fontWeight: 'bold' };
    return {};
  };

  const renderAthletesTable = (athletes: Athlete[], specialtyId: number) => {
    const filteredAthletes = athletes.filter(
      athlete => athlete.specialtyId === specialtyId
    );

    if (filteredAthletes.length === 0) return null;

    return (
      <div className="athletes-table-container" key={specialtyId}>
        <h2>Specialty {specialtyId}</h2>
        <table className="athletes-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Nation ID</th>
              <th>Max ID</th>
              <th>Form</th>
              <th>Care</th>
              <th>Experience</th>
              <th>Mood</th>
              <th>Strength</th>
              <th>Stamina</th>
              <th>Speed</th>
              <th>Agility</th>
              <th>Jump</th>
              <th>Throw</th>
              <th>Specialty 1</th>
              <th>Specialty 2</th>
            </tr>
          </thead>
          <tbody>
            {filteredAthletes.map((athlete) => (
              <tr key={athlete.athleteId}>
                <td>
                  <Link 
                    to={`/athlete/${athlete.athleteId}`} 
                    className="athlete-link"
                    style={{ color: athlete.sex === '0' ? '#32A9AF' : '#E63CE6' }}
                  >
                    {`${athlete.name} ${athlete.surname}`}
                  </Link>
                </td>
                <td>{athlete.sex}</td>
                <td>{athlete.age}</td>
                <td>{athlete.nationId}</td>
                <td>{athlete.maxid}</td>
                <td>{athlete.form}</td>
                <td style={getStatStyle(athlete.care)}>{athlete.care}</td>
                <td style={getStatStyle(athlete.experience)}>{athlete.experience}</td>
                <td style={getStatStyle(athlete.mood)}>{athlete.mood}</td>
                <td style={getStatStyle(athlete.strenght)}>{athlete.strenght}</td>
                <td style={getStatStyle(athlete.stamina)}>{athlete.stamina}</td>
                <td style={getStatStyle(athlete.speed)}>{athlete.speed}</td>
                <td style={getStatStyle(athlete.agility)}>{athlete.agility}</td>
                <td style={getStatStyle(athlete.jump)}>{athlete.jump}</td>
                <td style={getStatStyle(athlete.throw)}>{athlete.throw}</td>
                <td style={getStatStyle(Number(athlete.specialty1))}>{athlete.specialty1}</td>
                <td style={getStatStyle(Number(athlete.specialty2))}>{athlete.specialty2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading athletes data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {specialties.map((specialtyId) => 
        renderAthletesTable(athletes, specialtyId)
      )}
    </div>
  );
};

export default Dashboard;