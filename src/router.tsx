import { Children } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import AuthLayout from './layouts/AuthLayout';
import DefaultLayout from './layouts/DefaultLayout';
import Root from './layouts/Root';
import StyleGuide from './pages/StyleGuide';
import { ForgotPassword, SignIn, SignUp } from './pages/authentication';
import { Pricing } from './pages/pricing';
// New Page Route Import Goes Here!!! 

// TODO: Add errorElement with sentry
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <RootBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to={ROUTES.SIGN_IN} />,
          },
          {
            path: ROUTES.SIGN_IN,
            element: <SignIn />,
          },
          {
            path: ROUTES.SIGN_UP,
            element: <SignUp />,
          },
          {
            path: ROUTES.FORGOT_PASSWORD,
            element: <ForgotPassword />,
          },
        ],
      },
      {
        element: <DefaultLayout />,
        children: [
          {
            path: ROUTES.STYLEGUIDE,
            element: <StyleGuide />,
          },
          {
            path: ROUTES.DASHBOARD_2,
            element: <StyleGuide />,
          },
          {
            path: ROUTES.FAVORITES,
            element: <StyleGuide />,
          },
          {
            path: ROUTES.FAVORITES_2,
            element: <StyleGuide />,
          },
          {
            path: ROUTES.SEARCH,
            element: <StyleGuide />,
          },
          {
            path: ROUTES.PRICING,
            element: <Pricing />,
          }
          // New Page Route Goes Here!!!
        ],
      },
      
    ],
  },
]);
