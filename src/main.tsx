import React from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { enableMockServiceWorker } from './mocks/browser';
import { AuthProvider } from './context';
import { NoteTaker } from './pages/app';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';

enableMockServiceWorker().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AuthProvider>
        <MantineProvider>
          <Notifications position='top-right' />
          <ModalsProvider>
            <NoteTaker />
          </ModalsProvider>
        </MantineProvider>
      </AuthProvider>
    </React.StrictMode>
  )
);
