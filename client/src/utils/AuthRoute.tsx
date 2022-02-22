import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

type Props = {
  children: JSX.Element;
};

const AuthRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate replace to='/' />;
  }
  return children;
};

export default AuthRoute;
