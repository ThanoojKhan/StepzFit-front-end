import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLogin from '../pages/admin/mainPages/login';
import TrainerLogin from '../pages/trainer/mainPages/login';

const ProtectedRoute = ({ component: Component, userType, ...rest }) => {
  const user = useSelector((state) => state.User)
  const admin = useSelector((state) => state.Trainer)
  const trainer = useSelector((state) => state.Admin)

  if (userType === 'user' && !user.token) {
    return <Navigate to="/login" />
  }
  else if (userType === 'admin' && !admin.token) {
    return <AdminLogin />
  }
  else if (userType === 'trainer' && !trainer.token) {
    return <TrainerLogin />
  }

  return <Component {...rest} />
};

export default ProtectedRoute;
