import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import MainLayout from '@/layouts/MainLayout';

const Home = lazy(() => import('@/pages/Home/Home'));
const Konsepsiya = lazy(() => import('@/pages/Konsepsiya/Konsepsiya'));
const Irs = lazy(() => import('@/pages/Irs/Irs'));
const Senedler = lazy(() => import('@/pages/Senedler/Senedler'));
const NewsList = lazy(() => import('@/pages/NewsList/NewsList'));
const NewsDetail = lazy(() => import('@/pages/NewsDetail/NewsDetail'));
const Login = lazy(() => import('@/pages/Login/Login'));
const Register = lazy(() => import('@/pages/Register/Register'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.KONSEPSIYA, element: <Konsepsiya /> },
      { path: ROUTES.IRS, element: <Irs /> },
      { path: ROUTES.SENEDLER, element: <Senedler /> },
      { path: ROUTES.XEBERLER, element: <NewsList /> },
      { path: ROUTES.XEBER_DETAIL, element: <NewsDetail /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
