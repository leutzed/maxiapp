export interface Athlete {
    id: string;
    name: string;
    age: string;
    birthday: string;
    strength: string;
    speed: string;
    stamina: string;
    dexterity: string;
    technique: string;
    aggressiveness: string;
    experience: string;
    intelligence: string;
    weight: string;
    height: string;
    value: string;
    injured: string;
    [key: string]: any; // Para outras propriedades que possam vir do XML
  }