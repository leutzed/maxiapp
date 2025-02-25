export interface AuthCredentials {
    user: string;
    scode: string;
  }
  
  export interface AuthResponse {
    message: string;
  }
  
  export interface AuthError {
    errors: Array<{
      message: string;
      context?: Record<string, any>;
    }>;
  }