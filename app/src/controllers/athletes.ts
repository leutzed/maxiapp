import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { parseXML } from '../utils/parser-xml.ts';
import { Athlete } from '../interfaces/athlete.ts';
import { Athletes } from '../interfaces/athletes.ts';
import * as athleteService from '../services/athleteService.ts';
import BadRequestError from '../errors/BadRequestError.ts';

const prisma = new PrismaClient();

export default class AthletesController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            // First check if we have athletes in the database
            const dbAthletes = await athleteService.findAllAthletes();
            
            // If we have no athletes or we want to force a sync with the external API
            if (dbAthletes.length === 0 || req.query.sync === 'true') {
                const syncResults = await athleteService.syncAthletes(req.session.maxiCookie || '');
                
                // Return the data with sync info
                res.json({
                    athletes: await athleteService.findAllAthletes(),
                    syncInfo: {
                        newCount: syncResults.newAthletes.length,
                        updatedCount: syncResults.updatedAthletes.length,
                        changesHistory: syncResults.changesHistory,
                        totalCount: syncResults.total
                    }
                });
                return;
            }
            
            // Return data from DB
            res.json(dbAthletes);
            return;
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

    async findAthleteById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const athleteId = parseInt(id);
            
            // First check if athlete exists in our database
            const dbAthlete = await athleteService.findAthleteByAthleteId(athleteId);
            
            // If athlete exists in database, return it
            if (dbAthlete) {
                res.json(dbAthlete);
                return;
            }
            
            // If not in db, fetch from external API and create in db
            const athleteData = await athleteService.fetchAthleteByIdFromWebservice(id, req.session.maxiCookie || '');
            
            // Create athlete in db
            const newAthlete = await athleteService.createAthlete(athleteData);
            
            res.json(newAthlete);
            return;
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
    
    // Endpoint to explicitly trigger sync
    async syncAthletes(req: Request, res: Response): Promise<void> {
        try {
            const syncResults = await athleteService.syncAthletes(req.session.maxiCookie || '');
            
            res.json({
                success: true,
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
    
    // Endpoint para buscar o histórico de um atleta específico
    async getAthleteHistory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const athleteId = parseInt(id);
            
            const history = await athleteService.getAthleteHistory(athleteId);
            
            res.json(history);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}