const API_URL = 'http://localhost:3000';

interface AuthCredentials {
    user: string;
    scode: string;
}

interface ApiError {
    errors: Array<{ message: string }>;
}

export const api = {
    auth: async (credentials: AuthCredentials) => {
        const response = await fetch(`${API_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });
        
        if (!response.ok) {
            const error: ApiError = await response.json();
            throw new Error(error.errors[0]?.message || 'Authentication failed');
        }
        
        return response.json();
    },

    getAthletes: async (teamId?: string) => {
        const url = new URL(`${API_URL}/athletes`);
        if (teamId) {
            url.searchParams.append('teamId', teamId);
        }

        const response = await fetch(url, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            const error: ApiError = await response.json();
            throw new Error(error.errors[0]?.message || 'Failed to fetch athletes');
        }
        
        return response.json();
    },

    checkAuth: async () => {
        const response = await fetch(`${API_URL}/auth/check`, {
            credentials: 'include'
        });
        return response.ok;
    }
};