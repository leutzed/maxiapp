import { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

interface Athlete {
    id: string;
    name: string;
    // Add other athlete properties as needed
}

interface AthletesContextType {
    athletes: Athlete[];
    loading: boolean;
    error: string | null;
    fetchAthletes: (teamId?: string) => Promise<void>;
}

const AthletesContext = createContext<AthletesContextType | null>(null);

export function AthletesProvider({ children }: { children: ReactNode }) {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAthletes = async (teamId?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getAthletes(teamId);
            setAthletes(Array.isArray(data) ? data : [data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch athletes');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AthletesContext.Provider value={{ athletes, loading, error, fetchAthletes }}>
            {children}
        </AthletesContext.Provider>
    );
}

export function useAthletes() {
    const context = useContext(AthletesContext);
    if (!context) {
        throw new Error('useAthletes must be used within an AthletesProvider');
    }
    return context;
}