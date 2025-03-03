import React from 'react';
import { AthleteData } from '../interfaces/AthleteTypes';
import '../styles/athleteCard.scss';

interface AthleteCardProps {
    athlete: AthleteData;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => {
    return (
        <div className="athlete-card">
            <div className="athlete-card-header">
                <h2>{athlete.name} {athlete.surname}</h2>
                <span className="athlete-id">
                    <a href={`https://www.maxithlon.com/user/atleta_one.php?tipo=aid&aid=${athlete.athleteId}`} target='_blank'>
                        ID: {athlete.athleteId}
                    </a>
                </span>
            </div>

            <div className="athlete-card-content">
                <div className="athlete-section personal">
                    <h3>Informações Pessoais</h3>
                    <div className="athlete-info-grid">
                        <div className="info-item">
                            <span className="label">Sexo:</span>
                            <span className="value">{athlete.sex === '0' ? 'Masculino' : 'Feminino'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Idade:</span>
                            <span className="value">{athlete.age}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Altura:</span>
                            <span className="value">{athlete.height} cm</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Peso:</span>
                            <span className="value">{athlete.weight} kg</span>
                        </div>
                        <div className="info-item">
                            <span className="label">País:</span>
                            <span className="value">ID: {athlete.nationId}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Dono:</span>
                            <span className="value">ID: {athlete.owner}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Fãs:</span>
                            <span className="value">{athlete.fans}</span>
                        </div>
                    </div>
                </div>

                <div className="athlete-section stats">
                    <h3>Atributos</h3>
                    <div className="athlete-info-grid">
                        <div className="info-item">
                            <span className="label">Forma:</span>
                            <span className="value">{athlete.form}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Cuidado:</span>
                            <span className="value">{athlete.care}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Experiência:</span>
                            <span className="value">{athlete.experience}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Humor:</span>
                            <span className="value">{athlete.mood}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Força:</span>
                            <span className="value">{athlete.strenght}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Resistência:</span>
                            <span className="value">{athlete.stamina}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Velocidade:</span>
                            <span className="value">{athlete.speed}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Agilidade:</span>
                            <span className="value">{athlete.agility}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Salto:</span>
                            <span className="value">{athlete.jump}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Arremesso:</span>
                            <span className="value">{athlete.throw}</span>
                        </div>
                    </div>
                </div>

                <div className="athlete-section specialty">
                    <h3>Especialidades</h3>
                    <div className="athlete-info-grid">
                        <div className="info-item">
                            <span className="label">ID Especialidade:</span>
                            <span className="value">{athlete.specialtyId._}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Especialidade 1:</span>
                            <span className="value">{athlete.specialty1}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Especialidade 2:</span>
                            <span className="value">{athlete.specialty2}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Evento Favorito:</span>
                            <span className="value">ID: {athlete.favoriteEventId}</span>
                        </div>
                    </div>
                </div>

                <div className="athlete-section other">
                    <h3>Outras Informações</h3>
                    <div className="athlete-info-grid">
                        <div className="info-item">
                            <span className="label">Salário:</span>
                            <span className="value">{athlete.wage}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">MaxID:</span>
                            <span className="value">{athlete.maxid}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Jovem:</span>
                            <span className="value">{athlete.youth === '0' ? 'Não' : 'Sim'}</span>
                        </div>
                        {athlete.position && (
                            <div className="info-item">
                                <span className="label">Posição:</span>
                                <span className="value">{athlete.position}</span>
                            </div>
                        )}
                        {athlete.team && (
                            <div className="info-item">
                                <span className="label">Equipe:</span>
                                <span className="value">{athlete.team}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteCard;