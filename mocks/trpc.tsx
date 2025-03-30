// https://github.com/trpc/trpc/discussions/1879

import { useState } from 'react';
import { type AppRouter } from '@/server/api/root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCReact,
  unstable_httpBatchStreamLink,
} from '@trpc/react-query';
import SuperJSON from 'superjson';

export const mockedTRPCApi = createTRPCReact<AppRouter>();

export const StorybookTrpcProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })
  );
  const [trpcClient] = useState(() =>
    mockedTRPCApi.createClient({
      links: [
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: window.location.origin + '/api/trpc',
          headers: () => {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            return headers;
          },
        }),
      ],
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <mockedTRPCApi.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </mockedTRPCApi.Provider>
    </QueryClientProvider>
  );
};

type TrpcContext = ReturnType<(typeof mockedTRPCApi)['useUtils']>;

const ActOnTrpcContext = ({
  callback,
  children,
}: React.PropsWithChildren<{
  callback: (trpcContext: TrpcContext) => void;
}>) => {
  const trpcContext = mockedTRPCApi.useUtils();
  callback(trpcContext);
  return <>{children}</>;
};

export const withTrpcContext =
  // eslint-disable-next-line react/display-name
  (callback: (context: TrpcContext) => void) => (Story: React.FC) => (
    <ActOnTrpcContext callback={callback}>
      <Story />
    </ActOnTrpcContext>
  );
