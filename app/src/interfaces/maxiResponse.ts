import { Athlete } from './athlete';

export default interface MaxiResponse {
    'maxi-xml': {
        error?: string;
        athlete: Athlete | Athlete[];
    };
}