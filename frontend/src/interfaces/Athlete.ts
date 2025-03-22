export interface Athlete {
  athleteId: number;
  name: string;
  surname: string;
  sex: string;
  age: number;
  nationId: number;
  owner: number;
  height: string;
  weight: string;
  fans: number;
  maxid: string;
  form: number;
  care: number;
  experience: number;
  mood: number;
  specialtyId: number;
  favoriteEventId: number;
  strenght: number;
  stamina: number;
  speed: number;
  agility: number;
  jump: number;
  throw: number;
  specialty1: string;
  specialty2: string;
  youth: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AthleteHistory {
  id: string;
  athleteId: number;
  attribute: string;
  oldValue: string;
  newValue: string;
  updatedAt: string;
  season: number;
  week: number;
}

export interface AthleteHistoryResponse {
  athlete: {
    athleteId: number;
    name: string;
  };
  history: AthleteHistory[];
}