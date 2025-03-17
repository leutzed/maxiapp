import React from 'react';
import { Athlete } from '../interfaces/Athlete';
import './AthleteCard.scss';

interface AthleteCardProps {
  athlete: Athlete;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => {
  const getStatStyle = (value: number) => {
    if (value >= 17) return 'stat-value high';
    if (value >= 10) return 'stat-value medium';
    return 'stat-value';
  };

  return (
    <div className="athlete-detail-card">
      <div className="athlete-header">
        <h2 className={athlete.sex === '0' ? 'name-male' : 'name-female'}>
          {athlete.name} {athlete.surname}
        </h2>
        <span className="maxid">MaxID: {athlete.maxid}</span>
      </div>
      
      <div className="athlete-stats">
        <div className="stat-group">
          <h3>Personal Info</h3>
          <div className="stat-item">
            <span>Age:</span> {athlete.age}
          </div>
          <div className="stat-item">
            <span>Sex:</span> {athlete.sex === '0' ? 'Male' : 'Female'}
          </div>
        </div>

        <div className="stat-group">
          <h3>Performance Stats</h3>
          <div className="stat-item">
            <span>Form:</span> <span className={getStatStyle(athlete.form)}>{athlete.form}</span>
          </div>
          <div className="stat-item">
            <span>Care:</span> <span className={getStatStyle(athlete.care)}>{athlete.care}</span>
          </div>
          <div className="stat-item">
            <span>Experience:</span> <span className={getStatStyle(athlete.experience)}>{athlete.experience}</span>
          </div>
          <div className="stat-item">
            <span>Mood:</span> <span className={getStatStyle(athlete.mood)}>{athlete.mood}</span>
          </div>
        </div>

        <div className="stat-group">
          <h3>Physical Attributes</h3>
          <div className="stat-item">
            <span>Strength:</span> <span className={getStatStyle(athlete.strenght)}>{athlete.strenght}</span>
          </div>
          <div className="stat-item">
            <span>Stamina:</span> <span className={getStatStyle(athlete.stamina)}>{athlete.stamina}</span>
          </div>
          <div className="stat-item">
            <span>Speed:</span> <span className={getStatStyle(athlete.speed)}>{athlete.speed}</span>
          </div>
          <div className="stat-item">
            <span>Agility:</span> <span className={getStatStyle(athlete.agility)}>{athlete.agility}</span>
          </div>
          <div className="stat-item">
            <span>Jump:</span> <span className={getStatStyle(athlete.jump)}>{athlete.jump}</span>
          </div>
          <div className="stat-item">
            <span>Throw:</span> <span className={getStatStyle(athlete.throw)}>{athlete.throw}</span>
          </div>
        </div>

        <div className="stat-group">
          <h3>Specialties</h3>
          <div className="stat-item">
            <span>Primary:</span> <span className={getStatStyle(Number(athlete.specialty1))}>{athlete.specialty1}</span>
          </div>
          <div className="stat-item">
            <span>Secondary:</span> <span className={getStatStyle(Number(athlete.specialty2))}>{athlete.specialty2}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;