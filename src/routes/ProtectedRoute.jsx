import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ userType, tokenCheck, element, ...rest }) => {
  const trainer = useSelector((state) => state.Trainer);
  const user = useSelector((state) => state.User);
  const admin = useSelector((state) => state.Admin);

  if (tokenCheck) {
    if (userType === 'admin' && admin.token) {
      return <Routes><Route {...rest} element={element} /></Routes>;
    } else if (userType === 'user' && user.token) {
      return <Routes><Route {...rest} element={element} /></Routes>;
    } else if (userType === 'trainer' && trainer.token) {
      return <Routes><Route {...rest} element={element} /></Routes>;
    } else {
      if (userType === 'admin') {
        return <Navigate to="/admin/login" />;
      } else if (userType === 'user') {
        return <Navigate to="/login" />;
      } else if (userType === 'trainer') {
        return <Navigate to="/trainer/login" />;
      }
    }
  } else {
    return <Routes><Route {...rest} element={element} /></Routes>;
  }
};

export default ProtectedRoute;
