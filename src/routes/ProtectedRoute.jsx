import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, userType, ...rest }) => {
  const user = useSelector((state) => state.User)
  const admin = useSelector((state) => state.Trainer)
  const trainer = useSelector((state) => state.Admin)

  if (userType === 'user' && !user.token) {
    return <Navigate to="/login" />
  }
  else if (userType === 'admin' && !admin.token) {
    return <Navigate to="/adminLogin" />
  }
  else if (userType === 'trainer' && !trainer.token) {
    return <Navigate to="/trainerLogin" />
  }

  return <Component {...rest} />
};

export default ProtectedRoute;
