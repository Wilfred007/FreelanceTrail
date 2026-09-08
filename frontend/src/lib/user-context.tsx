'use client';

import { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useConnection } from 'wagmi';
import { api, type DeveloperSummary } from './api';

interface UserContextValue {
  user: DeveloperSummary | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  loading: false,
  error: null,
  refresh: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useConnection();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['connect', address],
    queryFn: () => api.connect(address!),
    enabled: isConnected && !!address,
  });

  const user = isConnected && address ? (query.data ?? null) : null;
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['connect', address] });

  return (
    <UserContext.Provider
      value={{ user, loading: query.isLoading, error: query.error ? query.error.message : null, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
