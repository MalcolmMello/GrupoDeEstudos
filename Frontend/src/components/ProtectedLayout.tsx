import { useAuth } from '../context/AuthProvider/useAuth';

const ProtectedLayout = ({children}: {children: JSX.Element}) => {
    const auth = useAuth();

    if(!auth.email){
        return null;
    }
  return children;
}

export default ProtectedLayout
