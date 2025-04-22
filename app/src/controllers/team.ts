import { Request, Response } from 'express';
import * as teamService from '../services/teamService';

export default class TeamController {
    async getTeam(req: Request, res: Response): Promise<void> {
        try {
            const teamData = await teamService.fetchTeamFromWebservice(req.session.maxiCookie || '');
            res.json(teamData);
        } catch (err) {
            console.error(err);
            
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
                return;
            }
            
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}