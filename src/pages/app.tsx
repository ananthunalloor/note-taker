import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NotFound } from './not-found/not-found';
import { Login } from './login/login';
import { Home } from './home/home';

export const NoteTaker = () => {
  const isAuthenticated = true;
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      {isAuthenticated ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='*' element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
