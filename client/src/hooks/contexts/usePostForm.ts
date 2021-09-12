import { useContext } from 'react';
import { PostFormContext } from '@/src/contexts';

export const usePostForm = () => {
  return useContext(PostFormContext);
};
