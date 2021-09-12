import { useContext } from 'react';
import { AuthContext } from '@/src/contexts';

export const useAuth = () => {
  return useContext(AuthContext);
};
