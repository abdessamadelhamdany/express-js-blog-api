import axios, { AxiosError, AxiosResponse } from 'axios';
import { createContext, Dispatch, FC, FormEvent, SetStateAction, useMemo, useState } from 'react';
import { useValidationState } from '../hooks';
import { ValidationError } from '../interfaces';
import { MediaLibrary } from '../interfaces/models/MediaLibrary';
import { ResizedImage } from '../lib/media-library';

export interface MediaLibraryUploadForm {
  alt: string;
  caption: string;
  images: ResizedImage[];
}

export interface IMediaLibraryContext {
  uploadForm: MediaLibraryUploadForm;
  setUploadForm: Dispatch<SetStateAction<MediaLibraryUploadForm>>;
  mediaFile: MediaLibrary;
  setMediaFile: Dispatch<SetStateAction<MediaLibrary>>;
  mediaLibrary: MediaLibrary[];
  setMediaLibrary: Dispatch<SetStateAction<MediaLibrary[]>>;
  mediaUploader: (e: FormEvent<HTMLFormElement>) => void;
  hasError: (key: string) => boolean;
  getError: (key: string) => string | undefined;
  setErrors: Dispatch<SetStateAction<ValidationError[]>>;
}

const initialState: IMediaLibraryContext = {
  uploadForm: {
    alt: '',
    caption: '',
    images: [],
  },
  setUploadForm() {},
  mediaFile: {},
  setMediaFile() {},
  mediaLibrary: [],
  setMediaLibrary() {},
  mediaUploader() {},
  hasError: () => false,
  getError: () => '',
  setErrors: () => {},
};

export const MediaLibraryContext = createContext<IMediaLibraryContext>(initialState);

interface Props {}

export const MediaLibraryProvider: FC<Props> = ({ children }) => {
  const [hasError, getError, setErrors] = useValidationState([]);
  const [mediaFile, setMediaFile] = useState<MediaLibrary>(initialState.mediaFile);
  const [mediaLibrary, setMediaLibrary] = useState<MediaLibrary[]>(initialState.mediaLibrary);
  const [uploadForm, setUploadForm] = useState<MediaLibraryUploadForm>(initialState.uploadForm);

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
      uploadForm,
      setUploadForm,
      mediaFile,
      setMediaFile,
      mediaLibrary,
      setMediaLibrary,
      mediaUploader,
      hasError,
      getError,
      setErrors,
    };
  }, [
    uploadForm,
    setUploadForm,
    mediaFile,
    setMediaFile,
    mediaLibrary,
    setMediaLibrary,
    hasError,
    getError,
    setErrors,
  ]);

  return <MediaLibraryContext.Provider value={memoedValue}>{children}</MediaLibraryContext.Provider>;
};
