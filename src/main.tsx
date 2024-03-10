import React from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { enableMockServiceWorker } from './mocks/browser';
import { AuthProvider } from './context';
import { NoteTaker } from './pages/app';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';

const queryClient = new QueryClient();

enableMockServiceWorker().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
        <AuthProvider>
          <MantineProvider>
            <Notifications position='top-right' />
            <ModalsProvider>
              <NoteTaker />
            </ModalsProvider>
          </MantineProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
);
