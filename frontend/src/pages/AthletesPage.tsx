import React, { useState } from 'react';
import AthletesList from '../components/AthletesList';

const AthletesPage: React.FC = () => {
  const [teamId, setTeamId] = useState<string>('');
  const [searchTeamId, setSearchTeamId] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTeamId(searchTeamId);
  };

  return (
    <div className="athletes-page">
      <h1>Atletas</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="ID do Time (opcional)"
          value={searchTeamId}
          onChange={(e) => setSearchTeamId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <h2>{teamId ? `Atletas do Time ${teamId}` : 'Meus Atletas'}</h2>
      <AthletesList teamId={teamId || undefined} />
    </div>
  );
};

export default AthletesPage;