import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Loader } from '@mantine/core';

import { NotFound } from './not-found/not-found';
import { Login } from './login/login';
import { Home } from './home/home';
import { AuthRequired } from '../components';

import '../assets/css/index.css';

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
          <Route element={<AuthRequired />}>
            <Route path='/' element={<Home />}>
              <Route path=':notebookId' element={null}>
                <Route path=':noteId' element={null} />
              </Route>
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};
