import axios from 'axios';

export interface CalendarData {
  season: string;
  currentWeek: string;
  currentDate: string;
}

export const fetchCalendar = async (): Promise<CalendarData> => {
  try {
    const response = await axios.get('/calendar');
    return response.data;
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return {
      season: '',
      currentWeek: '',
      currentDate: ''
    };
  }
};

export const storeCalendarData = (calendarData: CalendarData): void => {
  localStorage.setItem('calendarData', JSON.stringify(calendarData));
};

export const getStoredCalendarData = (): CalendarData => {
  const calendarData = localStorage.getItem('calendarData');
  return calendarData ? JSON.parse(calendarData) : {
    season: '',
    currentWeek: '',
    currentDate: ''
  };
};