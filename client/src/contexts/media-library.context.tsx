import axios, { AxiosError, AxiosResponse } from 'axios';
import { createContext, Dispatch, FC, FormEvent, SetStateAction, useMemo, useState } from 'react';
import { useValidationState } from '../hooks';
import { MediaLibrary } from '../interfaces/models/MediaLibrary';

export interface IMediaLibraryContext {
  mediaFile: MediaLibrary;
  setMediaFile: Dispatch<SetStateAction<MediaLibrary>>;
  mediaLibrary: MediaLibrary[];
  setMediaLibrary: Dispatch<SetStateAction<MediaLibrary[]>>;
  mediaUploader: (e: FormEvent<HTMLFormElement>) => void;
  hasError: (key: string) => boolean;
  getError: (key: string) => string | undefined;
}

const initialState: IMediaLibraryContext = {
  mediaFile: {},
  setMediaFile() {},
  mediaLibrary: [],
  setMediaLibrary() {},
  mediaUploader() {},
  hasError: () => false,
  getError: () => '',
};

export const MediaLibraryContext = createContext<IMediaLibraryContext>(initialState);

interface Props {}

export const MediaLibraryProvider: FC<Props> = ({ children }) => {
  const [hasError, getError, setErrors] = useValidationState([]);
  const [mediaFile, setMediaFile] = useState<MediaLibrary>({});
  const [mediaLibrary, setMediaLibrary] = useState<MediaLibrary[]>([]);

  const memoedValue = useMemo(() => {
    const mediaUploader = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      axios
        .post('/api/media-library/upload', formData)
        .then((res: AxiosResponse) => {
          setMediaLibrary((mediaLibrary) => [res.data.data.mediaFile, ...mediaLibrary]);
        })
        .catch((err: AxiosError) => {
          if (err.response && [400].includes(err.response.status) && err.response.data.errors) {
            setErrors(err.response.data.errors);
          }
        });
    };

    return {
      mediaFile,
      setMediaFile,
      mediaLibrary,
      setMediaLibrary,
      mediaUploader,
      hasError,
      getError,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaFile, mediaLibrary]);

  return <MediaLibraryContext.Provider value={memoedValue}>{children}</MediaLibraryContext.Provider>;
};
