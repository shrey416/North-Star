// src/hooks/useAuthenticatedFetch.ts
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';

const API_BASE_URL = 'http://127.0.0.1/api'; // Your backend URL

export const useAuthenticatedFetch = () => {
  const { user } = useAuth();

  const authenticatedFetch = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      if (!user) {
        console.log('User is not authenticated.');
        throw new Error('User is not authenticated.');
      }

      const idToken = await user.getIdToken();
      // console.log('Using ID Token:', idToken);

      const headers = new Headers(options.headers || {});
      headers.set('Authorization', `Bearer ${idToken}`);
      if (!headers.has('Content-Type') && options.body) {
         headers.set('Content-Type', 'application/json');
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'An unknown error occurred' }));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      // Handle responses with no content
      if (response.status === 204) {
          return null;
      }
      
      return response.json();
    },
    [user]
  );

  return authenticatedFetch;
};