import api from './axios';
import { Athlete } from '../types/athlete';

export const getAthletesByTeamId = async (teamId?: string): Promise<Athlete[]> => {
  const params = teamId ? { teamId } : {};
  const response = await api.get<Athlete[]>('/athletes', { params });
  return response.data;
};