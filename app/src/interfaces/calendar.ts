export interface CalendarData {
    season: string;
    currentWeek: string;
    currentDate: string;
}

export default interface CalendarResponse {
    'maxi-xml': {
        error?: string;
        season?: string;
        currentWeek?: string;
        currentDate?: string;
    };
}