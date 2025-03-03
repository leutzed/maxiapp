export interface Athlete {
    'maxi-xml': {
        error?: string;
        athleteId: string;
        name: string;
        surname: string;
        sex: string;
        age: number;
        nationId: string;
        owner: string;
        wage: number;
        height: number;
        weight: number;
        fans: number;
        maxid: string;
        form: number;
        care: number;
        experience: number;
        mood: number;
        specialtyId: {
            value: string;
            attributes?: Record<string, any>;
        };
        favoriteEventId: string;
        strenght: number;
        stamina: number;
        speed: number;
        agility: number;
        jump: number;
        throw: number;
        specialty1: string;
        specialty2: string;
        youth: boolean;
        position?: string;
        team?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
}