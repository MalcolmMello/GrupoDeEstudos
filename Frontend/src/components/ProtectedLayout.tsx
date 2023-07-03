import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider/useAuth';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  if (!auth.token) {
    navigate('/login');
  }
  return children;
}

export default ProtectedLayout
