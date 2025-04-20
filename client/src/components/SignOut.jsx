import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignOut = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate('/');
  }, [signOut, navigate]);

  return null; // or a loading spinner / "Signing out..."
};

export default SignOut;