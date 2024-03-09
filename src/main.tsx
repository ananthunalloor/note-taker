import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { enableMockServiceWorker } from './mocks/browser';
import { AppEntry } from './pages/app';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';

enableMockServiceWorker().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <MantineProvider>
        <Notifications />
        <ModalsProvider>
          <AppEntry />
        </ModalsProvider>
      </MantineProvider>
    </React.StrictMode>
  )
);
