import { Team } from "../interfaces/team";
import { parseXML } from "../utils/parser-xml";
import BadRequestError from "../errors/BadRequestError";

/**
 * Busca as informações do time no webservice externo
 * @param maxiCookie Cookie de autenticação para o webservice externo
 * @returns Dados do time, incluindo o teamId
 */
export const fetchTeamFromWebservice = async (maxiCookie: string): Promise<any> => {
    const response = await fetch(`https://www.maxithlon.com/maxi-xml/team.php`, {
        method: "GET",
        headers: {
            Cookie: maxiCookie || ''
        },
        credentials: 'include',
    });

    const xmlText = await response.text();
    const jsonResponse = await parseXML<Team>(xmlText);
    
    if (jsonResponse['maxi-xml'].error) {
        throw new BadRequestError({ message: jsonResponse['maxi-xml'].error });
    }

    return jsonResponse['maxi-xml'];
}