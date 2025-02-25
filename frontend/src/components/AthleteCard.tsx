import React from 'react';
import { Athlete } from '../types/athlete';

interface AthleteCardProps {
  athlete: Athlete;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => {
  // Calcula uma média das habilidades para exibir como classificação geral
  const calculateOverall = (): number => {
    const skills = [
      Number(athlete.strength),
      Number(athlete.speed),
      Number(athlete.stamina),
      Number(athlete.dexterity),
      Number(athlete.technique),
      Number(athlete.aggressiveness),
      Number(athlete.experience),
      Number(athlete.intelligence)
    ];
    
    const sum = skills.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / skills.length);
  };

  return (
    <div className={`athlete-card ${athlete.injured === 'yes' ? 'injured' : ''}`}>
      <h3>{athlete.name}</h3>
      <div className="athlete-info">
        <p><strong>Idade:</strong> {athlete.age}</p>
        <p><strong>Valor:</strong> {athlete.value}</p>
        <p><strong>Overall:</strong> {calculateOverall()}</p>
        {athlete.injured === 'yes' && <p className="injured-tag">Lesionado</p>}
      </div>
      
      <div className="athlete-stats">
        <div className="stat">
          <span>FOR</span>
          <div className="stat-bar">
            <div 
              className="stat-fill" 
              style={{ width: `${Number(athlete.strength) * 10}%` }}
            ></div>
          </div>
        </div>
        <div className="stat">
          <span>VEL</span>
          <div className="stat-bar">
            <div 
              className="stat-fill" 
              style={{ width: `${Number(athlete.speed) * 10}%` }}
            ></div>
          </div>
        </div>
        <div className="stat">
          <span>RES</span>
          <div className="stat-bar">
            <div 
              className="stat-fill" 
              style={{ width: `${Number(athlete.stamina) * 10}%` }}
            ></div>
          </div>
        </div>
        <div className="stat">
          <span>TEC</span>
          <div className="stat-bar">
            <div 
              className="stat-fill" 
              style={{ width: `${Number(athlete.technique) * 10}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;