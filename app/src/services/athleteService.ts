import { PrismaClient } from "@prisma/client";
import { Athlete } from "../interfaces/athlete";
import { parseXML } from "../utils/parser-xml";
import { Athletes } from "../interfaces/athletes";
import BadRequestError from "../errors/BadRequestError";

const prisma = new PrismaClient();

export const createAthlete = async (data: any) => {
    // Verifica se specialtyId é um objeto ou um valor direto
    let specialtyIdValue = data.specialtyId;
    if (typeof data.specialtyId === 'object') {
        // Se for um objeto, extrai o valor '_' (valor do texto) ou simplesmente o valor
        specialtyIdValue = data.specialtyId._ || data.specialtyId.value || data.specialtyId;
    }
    
    // Preparar os dados básicos do atleta
    const athleteData = {
        athleteId: parseInt(data.athleteId),
        name: data.name,
        surname: data.surname,
        sex: data.sex,
        age: parseInt(data.age),
        nationId: parseInt(data.nationId),
        owner: parseInt(data.owner),
        height: data.height.toString(),
        weight: data.weight.toString(),
        fans: parseInt(data.fans),
        maxid: data.maxid,
        form: parseInt(data.form),
        care: parseInt(data.care),
        experience: parseInt(data.experience),
        mood: parseInt(data.mood),
        specialtyId: parseInt(specialtyIdValue),
        favoriteEventId: parseInt(data.favoriteEventId),
        strenght: parseInt(data.strenght),
        stamina: parseInt(data.stamina),
        speed: parseInt(data.speed),
        agility: parseInt(data.agility),
        jump: parseInt(data.jump),
        throw: parseInt(data.throw),
        specialty1: parseInt(data.specialty1),
        specialty2: parseInt(data.specialty2),
        youth: data.youth === 'true' ? 1 : parseInt(data.youth)
    };
    
    return await prisma.athlete.create({ 
        data: athleteData
    });
}

/**
 * Busca um atleta no banco de dados pelo seu athleteId único
 * @param athleteId O ID do atleta no sistema externo
 * @returns O atleta encontrado ou null se não existir
 */
export const findAthleteByAthleteId = async (athleteId: number) => {
    return await prisma.athlete.findUnique({
        where: {
            athleteId  // Usa a constraint @unique definida no schema
        }
    });
}

export const findAllAthletes = async () => {
    return await prisma.athlete.findMany();
}

export const fetchAthletesFromWebservice = async (maxiCookie: string): Promise<any[]> => {
    const response = await fetch(`https://www.maxithlon.com/maxi-xml/athletes.php`, {
        method: "GET",
        headers: {
            Cookie: maxiCookie || ''
        },
        credentials: 'include',
    });

    const xmlText = await response.text();
    const jsonResponse = await parseXML<Athletes>(xmlText);
    
    if (jsonResponse['maxi-xml'].error) {
        // Lançar BadRequestError em vez de Error para que seja tratado como HTTP 400
        throw new BadRequestError({ message: jsonResponse['maxi-xml'].error });
    }

    // Processar o array de atletas considerando a estrutura específica
    let athletes = jsonResponse['maxi-xml'].athlete;
    
    // Garantir que temos um array, mesmo que seja apenas um atleta
    if (!Array.isArray(athletes)) {
        athletes = [athletes];
    }
    
    return athletes;
}

export const fetchAthleteByIdFromWebservice = async (athleteId: string, maxiCookie: string) => {
    const response = await fetch(`https://www.maxithlon.com/maxi-xml/athlete.php?athleteid=${athleteId}`, {
        method: "GET",
        headers: {
            Cookie: maxiCookie || ''
        },
        credentials: 'include',
    });
    
    const xmlText = await response.text();
    const jsonResponse = await parseXML<Athlete>(xmlText);
    
    if (jsonResponse['maxi-xml'].error) {
        // Lançar BadRequestError em vez de Error para que seja tratado como HTTP 400
        throw new BadRequestError({ message: jsonResponse['maxi-xml'].error });
    }

    // Retorna o atleta com estrutura específica
    return jsonResponse['maxi-xml'].athlete;
}

/**
 * Atualiza os dados de um atleta existente no banco de dados
 * @param athleteId ID do atleta a ser atualizado
 * @param data Novos dados do atleta
 * @returns O atleta atualizado
 */
export const updateAthlete = async (athleteId: number, data: any) => {
    return await prisma.athlete.update({
        where: {
            athleteId
        },
        data: {
            name: data.name,
            surname: data.surname,
            sex: data.sex,
            age: parseInt(data.age),
            nationId: parseInt(data.nationId),
            owner: parseInt(data.owner),
            height: data.height.toString(),
            weight: data.weight.toString(),
            fans: parseInt(data.fans),
            maxid: data.maxid,
            form: parseInt(data.form),
            care: parseInt(data.care),
            experience: parseInt(data.experience),
            mood: parseInt(data.mood),
            specialtyId: parseInt(data.specialtyId.value),
            favoriteEventId: parseInt(data.favoriteEventId),
            strenght: parseInt(data.strenght),
            stamina: parseInt(data.stamina),
            speed: parseInt(data.speed),
            agility: parseInt(data.agility),
            jump: parseInt(data.jump),
            throw: parseInt(data.throw),
            specialty1: parseInt(data.specialty1),
            specialty2: parseInt(data.specialty2),
            youth: data.youth === 'true' ? 1 : 0
        }
    });
}

/**
 * Registra as mudanças de atributos de um atleta na tabela de histórico
 * 
 * @param athleteId ID do atleta
 * @param existingAthlete Dados atuais do atleta no banco
 * @param newData Novos dados vindos do webservice
 * @returns Array com os registros de histórico criados
 */
export const recordAthleteChanges = async (athleteId: number, existingAthlete: any, newData: any) => {
    const changes = [];
    const currentSeason = 0; // TODO: Obter a temporada atual
    const currentWeek = 0; // TODO: Obter a semana atual
    
    // Lista de atributos que queremos monitorar mudanças
    const attributesToTrack = [
        'age', 'owner', 'height', 'weight', 'maxid', 'form', 'care', 'experience', 'mood', 
        'strenght', 'stamina', 'speed', 'agility', 'jump', 'throw', 
        'specialty1', 'specialty2'
    ];
    
    // Para cada atributo, verificar se houve mudança
    for (const attr of attributesToTrack) {
        // Converter para string para garantir comparação consistente
        const oldValue = String(existingAthlete[attr]);
        
        // Verifica como o valor está estruturado nos dados novos
        let newValue;
        if (attr === 'specialtyId' && newData[attr] && typeof newData[attr] === 'object') {
            // Para o specialtyId, que pode ser tanto um objeto com propriedade '_' quanto um valor direto
            newValue = String(newData[attr]._ || newData[attr].value || newData[attr]);
        } else {
            newValue = String(newData[attr]);
        }
        
        // Se o valor mudou, registrar na tabela de histórico
        if (oldValue !== newValue) {
            const historyRecord = await prisma.athleteHistory.create({
                data: {
                    athleteId,
                    attribute: attr,
                    oldValue,
                    newValue,
                    season: currentSeason,
                    week: currentWeek
                }
            });
            changes.push(historyRecord);
        }
    }
    
    return changes;
}

/**
 * Atualiza os dados de um atleta existente no banco de dados,
 * após registrar as mudanças na tabela de histórico
 * 
 * @param athleteId ID do atleta a ser atualizado
 * @param existingAthlete Dados atuais do atleta no banco
 * @param newData Novos dados do atleta
 * @returns Objeto com o atleta atualizado e as mudanças registradas
 */
export const updateAthleteWithHistory = async (athleteId: number, existingAthlete: any, newData: any) => {
    // Primeiro registra as mudanças na tabela de histórico
    const changes = await recordAthleteChanges(athleteId, existingAthlete, newData);
    
    // Se não houve mudanças, retorna o atleta existente
    if (changes.length === 0) {
        return {
            athlete: existingAthlete,
            changes: []
        };
    }
    
    // Extrai especialidade corretamente, que pode ser objeto ou valor direto
    let specialtyIdValue = newData.specialtyId;
    if (typeof newData.specialtyId === 'object') {
        specialtyIdValue = newData.specialtyId._ || newData.specialtyId.value || newData.specialtyId;
    }
    
    // Preparar os dados de atualização
    const updateData = {
        name: newData.name,
        surname: newData.surname,
        sex: newData.sex,
        age: parseInt(newData.age),
        nationId: parseInt(newData.nationId),
        owner: parseInt(newData.owner),
        height: newData.height.toString(),
        weight: newData.weight.toString(),
        fans: parseInt(newData.fans),
        maxid: newData.maxid,
        form: parseInt(newData.form),
        care: parseInt(newData.care),
        experience: parseInt(newData.experience),
        mood: parseInt(newData.mood),
        specialtyId: parseInt(specialtyIdValue),
        favoriteEventId: parseInt(newData.favoriteEventId),
        strenght: parseInt(newData.strenght),
        stamina: parseInt(newData.stamina),
        speed: parseInt(newData.speed),
        agility: parseInt(newData.agility),
        jump: parseInt(newData.jump),
        throw: parseInt(newData.throw),
        specialty1: parseInt(newData.specialty1),
        specialty2: parseInt(newData.specialty2),
        youth: newData.youth === 'true' ? 1 : parseInt(newData.youth)
    };
    
    // Atualiza o atleta com os dados preparados
    const updatedAthlete = await prisma.athlete.update({
        where: {
            athleteId
        },
        data: updateData
    });
    
    return {
        athlete: updatedAthlete,
        changes
    };
}

/**
 * Sincroniza atletas do webservice externo com o banco de dados local.
 * Verifica cada atleta pelo seu athleteId único e cria novos registros
 * para aqueles que ainda não existem no banco.
 * Para atletas existentes, registra as mudanças no histórico antes de atualizar.
 * 
 * @param maxiCookie Cookie de autenticação para o webservice externo
 * @param teamId ID do time a ser associado aos atletas durante a sincronização (usará owner se fornecido)
 * @returns Objeto com informações sobre atletas novos e atualizados
 */
export const syncAthletes = async (maxiCookie: string, teamId?: number) => {
    const webserviceAthletes = await fetchAthletesFromWebservice(maxiCookie);
    const newAthletes = [];
    const updatedAthletes = [];
    const changesHistory = [];
    
    console.log(`Sincronizando atletas para o time ID: ${teamId || 'usando owner existente'}`);
    
    for (const athlete of webserviceAthletes) {
        // Verifica se o atleta já existe no banco de dados pelo athleteId
        const athleteId = parseInt(athlete.athleteId);
        const existingAthlete = await findAthleteByAthleteId(athleteId);
        
        // Se o teamId foi fornecido e é diferente do owner atual, atualiza o owner
        if (teamId && parseInt(athlete.owner) !== teamId) {
            console.log(`Atualizando owner do atleta ${athleteId} de ${athlete.owner} para ${teamId}`);
            athlete.owner = teamId.toString();
        }
        
        if (!existingAthlete) {
            // Atleta não existe no banco, cria um novo registro
            const newAthlete = await createAthlete(athlete);
            newAthletes.push(newAthlete);
        } else {
            // Atleta existe, registra mudanças e atualiza
            const result = await updateAthleteWithHistory(athleteId, existingAthlete, athlete);
            
            if (result.changes.length > 0) {
                updatedAthletes.push(result.athlete);
                changesHistory.push({
                    athleteId,
                    name: `${existingAthlete.name} ${existingAthlete.surname}`,
                    changes: result.changes
                });
            }
        }
    }
    return {
        newAthletes,
        updatedAthletes,
        changesHistory,
        total: webserviceAthletes.length
    };
}

/**
 * Busca o histórico de alterações de um atleta específico
 * @param athleteId ID do atleta 
 * @returns Lista de registros de histórico ordenados por data de atualização
 */
export const getAthleteHistory = async (athleteId: number) => {
    return await prisma.athleteHistory.findMany({
        where: {
            athleteId
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });
}