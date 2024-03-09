import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mantine/core';

import { NotFound } from './not-found/not-found';
import { Login } from './login/login';
import { Home } from './home/home';

import { AuthRequired } from '../components';

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
        <Routes>
          <Route element={<AuthRequired />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};
