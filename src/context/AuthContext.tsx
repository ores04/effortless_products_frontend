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
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  supabase: SupabaseClient | null;
}

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
    const initSupabase = async () => {
      const client = createSupabaseClient(token || undefined);
      setSupabase(client);

      if (token) {
        // Fetch user details using Supabase
        const { data: { user }, error } = await client.auth.getUser(token);
        if (user) {
          setUser(user);
        } else if (error) {
          console.error('Error fetching user:', error);
          // Optional: Clear token if invalid?
          // setToken(null);
          // localStorage.removeItem('authToken');
        }
      } else {
        setUser(null);
      }
    };

    initSupabase();
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

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout, loading, error, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};
