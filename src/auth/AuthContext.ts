import { createContext, useContext } from 'react';

export interface AuthContextValue {
  configured: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string>;
}

const missingConfigurationError = 'Authentication is not configured';

export const AuthContext = createContext<AuthContextValue>({
  configured: false,
  isAuthenticated: false,
  isLoading: false,
  signIn: async () => {
    throw new Error(missingConfigurationError);
  },
  signOut: async () => undefined,
  getAccessToken: async () => {
    throw new Error(missingConfigurationError);
  },
});

export function useAuth() {
  return useContext(AuthContext);
}
