import './globals.css';

import { Inter } from 'next/font/google';
import { ClientProvider } from '@/client/trpcClient';
import { twMerge } from 'tailwind-merge';

import { ToastContainer } from '@/hooks/useToast';

import { EdgeStoreProvider } from '@/lib/edgestore';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={twMerge(inter.className, 'flex justify-center')}>
          <ClientProvider>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </ClientProvider>
          <ToastContainer />
        </body>
      </html>
    </SessionProvider>
  );
}
