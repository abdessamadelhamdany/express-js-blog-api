import { useContext } from 'react';
import { PostContext } from '@/src/contexts';

export const usePost = () => {
  return useContext(PostContext);
};
