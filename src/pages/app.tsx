import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Loader } from '@mantine/core';

import { NotFound } from './not-found/not-found';
import { Login } from './login/login';
import { Home } from './home/home';
import { AuthRequired } from '../components';

import '../assets/css/index.css';
import { Suspense } from 'react';

export const NoteTaker = () => {
  return (
    <Box
      style={{
        height: '100vh',
        width: '100vw',
        padding: 0,
        margin: 0
      }}
    >
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Suspense fallback={<Loader />} />
        <Routes>
          <Route path='/' element={<AuthRequired />}>
            <Route index element={<Home />} />
            <Route path=':notebookId' element={<Home />}>
              <Route path=':noteId' element={<Home />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};
