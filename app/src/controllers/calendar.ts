// filepath: /mnt/c/Users/leutz/Documents/maxiapp/app/src/controllers/calendar.ts
import { Request, Response } from 'express';
import { parseXML } from '../utils/parser-xml.ts';
import CalendarResponse, { CalendarData } from '../interfaces/calendar.ts';

export default class CalendarController {
    async getCalendar(req: Request, res: Response): Promise<void> {
        try {
            const response = await fetch(`https://www.maxithlon.com/maxi-xml/calendar.php`, {
                method: "GET",
                headers: {
                    Cookie: req.session.maxiCookie || ''
                },
                credentials: 'include',
            });

            const jsonResponse = await parseXML<CalendarResponse>(await response.text());
            
            if (jsonResponse['maxi-xml'].error) {
                res.status(400).json({ message: jsonResponse['maxi-xml'].error });
                return;
            }

            // Extrair apenas as informações essenciais
            const calendarData: CalendarData = {
                season: jsonResponse['maxi-xml'].season || '',
                currentWeek: jsonResponse['maxi-xml'].currentWeek || '',
                currentDate: jsonResponse['maxi-xml'].currentDate || ''
            };
            
            // Retornar apenas os dados essenciais
            res.json(calendarData);
        } catch (err) {
            console.error('Error in getCalendar:', err);
            res.status(500).json({ message: 'Error fetching calendar data' });
        }
    }
}