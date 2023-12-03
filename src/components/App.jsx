import { Routes, Route} from "react-router-dom";
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshThunk } from 'redux/auth/auth.reducer';
import Layout from "Layout/Layout.jsx";
import * as ROUTES from 'constants/routes.js';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
const HomePage = React.lazy(() => import("pages/HomePage.jsx"));
const Login = React.lazy(() => import("pages/LoginPage.jsx"));
const Register = React.lazy(() => import("pages/RegisterPage.jsx"));
const Contacts = React.lazy(() => import("pages/ContactsPage.jsx"));


const appRoutes = [
  {
  path: ROUTES.HOME_ROUTE,
    element: <RestrictedRoute>
      <HomePage />
    </RestrictedRoute>,
  },
  {
  path: ROUTES.LOGIN_ROUTE,
    element: <RestrictedRoute>
      <Login />
    </RestrictedRoute>,
  },
  {
  path: ROUTES.REGISTER_ROUTE,
    element: <RestrictedRoute>
      <Register />
    </RestrictedRoute>,
  },
  {
  path: ROUTES.CONTACTS_ROUTE,
    element: <PrivateRoute>
      <Contacts />
    </PrivateRoute>,
  },
];

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk())
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;