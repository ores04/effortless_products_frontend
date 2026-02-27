/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { endpoints, defaultHeaders } from '../services/api';
import { createSupabaseClient } from '../services/supabaseClient';

interface User {
  email?: string;
  id?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  supabase: SupabaseClient | null;
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  // Initialize Supabase client and fetch user when token changes
  useEffect(() => {
    let logoutTimer: ReturnType<typeof setTimeout>;

    const initSupabase = async () => {
      if (token) {
        const decoded = parseJwt(token);
        if (decoded && decoded.exp) {
          const expirationTime = decoded.exp * 1000;
          const timeUntilExpiry = expirationTime - Date.now();
          
          if (timeUntilExpiry <= 0) {
            console.warn('Token expired, logging out automatically');
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
            return;
          } else {
            // Set a timer to log out when the token expires
            logoutTimer = setTimeout(() => {
              console.warn('Token expired while session was active, logging out');
              setToken(null);
              setUser(null);
              localStorage.removeItem('authToken');
            }, timeUntilExpiry);
          }
        }
      }

      const client = createSupabaseClient(token || undefined);
      setSupabase(client);

      if (token) {
        // Fetch user details using Supabase
        const { data: { user }, error } = await client.auth.getUser(token);
        if (user) {
          setUser(user);
        } else if (error) {
          console.error('Error fetching user:', error);
          if (error.status === 401 || error.message.toLowerCase().includes('expired')) {
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
          }
        }
      } else {
        setUser(null);
      }
    };

    initSupabase();

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [token]);


  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoints.login, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Login failed');
      }

      const data = await response.json();
      // Response structure: { message: string, user: object, session: object, access_token: string | null }
      const receivedToken = data.access_token;

      if (receivedToken) {
        setToken(receivedToken);
        localStorage.setItem('authToken', receivedToken);
        // We could optionally set user here immediately from data.user, 
        // but the useEffect will handle it safely via Supabase client verification.
      } else {
         throw new Error('No access token received from server');
      }
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoints.register, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Registration failed');
      }

      const data = await response.json();
      // Response structure: { message: string, user: object, session: object, access_token: string | null }
      const receivedToken = data.access_token;

      if (receivedToken) {
        setToken(receivedToken);
        localStorage.setItem('authToken', receivedToken);
      } else {
          throw new Error('No access token received from server');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
       if (token) {
           await fetch(endpoints.logout, {
            method: 'POST',
            headers: {
              ...defaultHeaders,
              'Authorization': `Bearer ${token}`
            },
          });
       }
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
      setLoading(false);
    }
  };

  const isAuthenticated = !!token;
  
  const decodedToken = token ? parseJwt(token) : null;
  const isAdmin = 
    decodedToken?.app_metadata?.role === 'admin' || 
    decodedToken?.raw_app_meta_data?.role === 'admin' || 
    decodedToken?.role === 'admin' || 
    user?.app_metadata?.role === 'admin' || 
    (user as any)?.raw_app_meta_data?.role === 'admin' ||
    false;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, login, register, logout, loading, error, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};
