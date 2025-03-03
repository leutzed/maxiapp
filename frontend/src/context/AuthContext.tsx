import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { fetchCalendar, storeCalendarData } from '../services/calendarService';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const updateCalendarData = async () => {
    try {
      const calendarData = await fetchCalendar();
      storeCalendarData(calendarData);
      console.log('Calendar data updated successfully', {
        season: calendarData.season,
        week: calendarData.currentWeek,
        date: calendarData.currentDate
      });
    } catch (error) {
      console.error('Failed to update calendar data:', error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/auth', { 
        user: username,
        scode: password
      });
      
      // Extract data from response
      const { message } = response.data;
      
      // Create user object from response data
      const userData = { id: username, username };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      
      // The backend doesn't return a token but sets a session cookie instead
      // So we'll set a flag to indicate the user is logged in
      localStorage.setItem('isAuthenticated', 'true');

      // Fetch and store calendar data after successful login
      await updateCalendarData();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('calendarData'); // Clear calendar data on logout
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!localStorage.getItem('isAuthenticated') || !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};