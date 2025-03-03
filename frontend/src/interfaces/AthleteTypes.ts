export interface AthleteData {
    athleteId: string;
    name: string;
    surname: string;
    sex: string;
    age: string | number;
    nationId: string;
    owner: string;
    wage: string;
    height: string;
    weight: string;
    fans: string;
    maxid: string;
    form: string;
    care: string;
    experience: string;
    mood: string;
    specialtyId: {
        _: string;
        $: object;
    };
    favoriteEventId: string;
    strenght: string;
    stamina: string;
    speed: string;
    agility: string;
    jump: string;
    throw: string;
    specialty1: string;
    specialty2: string;
    youth: string;
    position?: string;
    team?: string;
}