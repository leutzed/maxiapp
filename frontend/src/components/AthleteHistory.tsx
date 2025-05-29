import React, { useEffect, useState } from 'react';
import { AthleteHistory, AthleteHistoryResponse } from '../interfaces/Athlete';
import './AthleteHistory.scss';

interface AthleteHistoryComponentProps {
  athleteId: number;
}

const AthleteHistoryComponent: React.FC<AthleteHistoryComponentProps> = ({ athleteId }) => {
  const [historyData, setHistoryData] = useState<AthleteHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAthleteHistory = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/athletes/${athleteId}/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch athlete history');
        }
        
        const data: AthleteHistoryResponse = await response.json();
        setHistoryData(data.history);
      } catch (err) {
        console.error('Error fetching athlete history:', err);
        setError(err instanceof Error ? err.message : 'Failed to load history data');
      } finally {
        setLoading(false);
      }
    };

    if (athleteId) {
      fetchAthleteHistory();
    }
  }, [athleteId]);

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Tradução dos atributos para uma versão mais amigável
  const getAttributeDisplayName = (attributeName: string) => {
    const attributeMap: Record<string, string> = {
      age: 'Age',
      owner: 'Owner',
      height: 'Height',
      weight: 'Weight',
      form: 'Form',
      care: 'Care',
      experience: 'Experience',
      mood: 'Mood',
      strenght: 'Strength',
      stamina: 'Stamina',
      speed: 'Speed',
      agility: 'Agility',
      jump: 'Jump',
      throw: 'Throw',
      specialty1: 'Specialty 1',
      specialty2: 'Specialty 2'
    };
    
    return attributeMap[attributeName] || attributeName;
  };

  if (loading) {
    return <div className="athlete-history-loading">Loading history...</div>;
  }

  if (error) {
    return <div className="athlete-history-error">Failed to load history: {error}</div>;
  }

  if (!historyData.length) {
    return <div className="athlete-history-empty">No history available for this athlete.</div>;
  }

  return (
    <div className="athlete-history-container">
      <h2>Evolution history</h2>
      <div className="athlete-history-table-container">
        <table className="athlete-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Season</th>
              <th>Week</th>
              <th>Attribute</th>
              <th>Previous Value</th>
              <th>New Value</th>
              <th>Evolution</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((record) => {
              const isImprovement = Number(record.newValue) > Number(record.oldValue);
              const isDecline = Number(record.newValue) < Number(record.oldValue);
              const changeValue = Number(record.newValue) - Number(record.oldValue);
              
              return (
                <tr key={record.id}>
                  <td>{formatDate(record.updatedAt)}</td>
                  <td>{record.season}</td>
                  <td>{record.week}</td>
                  <td>{getAttributeDisplayName(record.attribute)}</td>
                  <td>{record.oldValue}</td>
                  <td>{record.newValue}</td>
                  <td className={
                    isImprovement ? 'change positive' : 
                    isDecline ? 'change negative' : ''
                  }>
                    {changeValue > 0 ? `+${changeValue}` : changeValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AthleteHistoryComponent;