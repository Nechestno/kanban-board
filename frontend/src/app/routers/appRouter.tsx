import { createHashRouter, Navigate, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { NoMatch } from '@/pages/nomatch';
import { RegisterPage } from '@/pages/register';
import { SiteLayout } from '../layout';
import { PrivateRoute } from './privateRouter';

export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <Route path="/" element={<SiteLayout />}>
      <Route index element={<Navigate to="login" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegisterPage />} />
      <Route element={<PrivateRoute  />}>
        <Route path="main" element={<MainPage />}> </Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Route>,
  );

  const router = createHashRouter(routers, {});

  return (
    <RouterProvider router={router} />
  );
};