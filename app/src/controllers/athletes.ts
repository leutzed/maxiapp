import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { parseXML } from '../utils/parser-xml';
import { Athlete } from '../interfaces/athlete';
import { Athletes } from '../interfaces/athletes';
import * as athleteService from '../services/athleteService';
import * as teamService from '../services/teamService';
import BadRequestError from '../errors/BadRequestError';

const prisma = new PrismaClient();

export default class AthletesController {
    // Endpoint to fetch all athletes from database or trigger sync
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            // Buscar as informações do time para obter o teamId
            const teamData = await teamService.fetchTeamFromWebservice(req.session.maxiCookie || '');
            const teamId = teamData && teamData.teamId ? parseInt(teamData.teamId) : undefined;

            if (!teamId) {
                throw new BadRequestError({ message: 'Team ID not found' });
            }

            const dbAthletes = await athleteService.findAllAthletes(teamId);
            res.json(dbAthletes);
        } catch (err) {
            console.error(err);
            if (err instanceof BadRequestError) {
                res.status(400).json({ message: err.message });
                return;
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Endpoint to fetch a specific athlete by athleteId or maxId
    async findOne(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            
            let athlete;
            
            // Try to find by athleteId (parsing as number)
            athlete = await prisma.athlete.findUnique({
                where: { 
                    athleteId: parseInt(id)
                }
            });
            
            // If not found by athleteId, try to find by maxid
            if (!athlete) {
                athlete = await prisma.athlete.findFirst({
                    where: { 
                        maxid: id 
                    }
                });
            }
            
            if (!athlete) {
                // If athlete not found locally, try to fetch from web service
                try {
                    const webserviceAthlete = await athleteService.fetchAthleteByIdFromWebservice(id, req.session.maxiCookie || '');
                    
                    // Create athlete in local DB
                    athlete = await athleteService.createAthlete(webserviceAthlete);
                    
                    res.json({
                        ...athlete,
                        _fromWebservice: true
                    });
                    return;
                } catch (webErr) {
                    // If also not found in webservice or error occurred
                    res.status(400).json({ message: 'Athlete not found' });
                    return;
                }
            }
            
            res.json(athlete);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Endpoint to explicitly trigger sync
    async syncAthletes(req: Request, res: Response): Promise<void> {
        try {
            // Primeiro, buscar as informações do time para obter o teamId
            const teamData = await teamService.fetchTeamFromWebservice(req.session.maxiCookie || '');
            
            // Extrair o teamId dos dados do time
            const teamId = teamData && teamData.teamId ? parseInt(teamData.teamId) : undefined;
            
            // Sincronizar atletas passando o teamId como parâmetro
            const syncResults = await athleteService.syncAthletes(req.session.maxiCookie || '', teamId);
            
            res.json({
                success: true,
                teamId: teamId,
                newCount: syncResults.newAthletes.length,
                updatedCount: syncResults.updatedAthletes.length,
                changesHistory: syncResults.changesHistory,
                totalCount: syncResults.total
            });
        } catch (err) {
            console.error(err);
            
            // Verificar se é um BadRequestError para retornar status 400
            if (err instanceof BadRequestError) {
                res.status(400).json({ message: err.message });
                return;
            }
            
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    // Endpoint to fetch athlete history
    async getHistory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const athleteId = parseInt(id);
            
            // Verificar se o atleta existe
            const athlete = await prisma.athlete.findUnique({
                where: { 
                    athleteId 
                }
            });
            
            if (!athlete) {
                res.status(400).json({ message: 'Athlete not found' });
                return;
            }
            
            // Buscar o histórico do atleta
            const history = await athleteService.getAthleteHistory(athleteId);
            
            res.json({
                athlete: {
                    athleteId,
                    name: `${athlete.name} ${athlete.surname}`
                },
                history
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}