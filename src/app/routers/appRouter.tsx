import { createHashRouter, Navigate, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { SiteLayout } from '../layout';
import { LoginPage } from '@/pages/login';
import { MainPage } from '../../pages/Main/MainPage.tsx';
import NoMatch from '../../pages/NoMatch/NoMatch.tsx';
import { RegisterPage } from '@/pages/register';

export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <Route path="/" element={<SiteLayout />}>
      <Route index element={<Navigate to="login" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegisterPage />} />
      <Route path="main" element={<MainPage />}> </Route>
      <Route path="*" element={<NoMatch />} />
    </Route>,
  );

  const router = createHashRouter(routers, {});

  return (
    <RouterProvider router={router} />
  );
};