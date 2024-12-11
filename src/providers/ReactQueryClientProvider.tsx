import { QueryClient, QueryClientProvider } from 'react-query';

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function ReactQueryClientProvider({ children }: ReactQueryClientProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default ReactQueryClientProvider;
