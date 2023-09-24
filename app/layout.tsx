import './globals.css';

import { Inter } from 'next/font/google';
// import QueryProvider from '@/components/QueryProvider';
import { ClientProvider } from '@/client/trpcClient';

import { ToastContainer } from '@/hooks/useToast';

import styles from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <div className={styles.container}>{children}</div>
        </ClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
