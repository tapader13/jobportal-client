import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Protected = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) return <Navigate to={'/login'} replace={true}></Navigate>;
  return children;
};
