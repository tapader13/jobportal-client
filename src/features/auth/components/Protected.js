import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoginUserInfo } from '../authSlice';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {
  const loggdinuserinfo = useSelector(selectLoginUserInfo);
  if (!loggdinuserinfo) {
    return <Navigate to={'/login'} replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
