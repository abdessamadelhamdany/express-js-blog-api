import { useContext } from 'react';
import { MediaLibraryContext } from '@/src/contexts';

export const useMediaLibrary = () => {
  return useContext(MediaLibraryContext);
};
