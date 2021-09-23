import axios, { AxiosError, AxiosResponse } from 'axios';
import { createContext, Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useValidationState } from '../hooks';
import { ValidationError } from '../interfaces';
import { MediaLibrary } from '../interfaces/models/MediaLibrary';

export interface MediaLibraryUploadForm {
  alt: string;
  caption: string;
  processedImages: Blob[];
}

export interface IMediaLibraryContext {
  uploadForm: MediaLibraryUploadForm;
  setUploadForm: Dispatch<SetStateAction<MediaLibraryUploadForm>>;
  mediaFile: MediaLibrary;
  setMediaFile: Dispatch<SetStateAction<MediaLibrary>>;
  mediaLibrary: MediaLibrary[];
  setMediaLibrary: Dispatch<SetStateAction<MediaLibrary[]>>;
  submitUploadForm: () => void;
  hasError: (key: string) => boolean;
  getError: (key: string) => string | undefined;
  setErrors: Dispatch<SetStateAction<ValidationError[]>>;
}

const initialState: IMediaLibraryContext = {
  uploadForm: {
    alt: '',
    caption: '',
    processedImages: [],
  },
  setUploadForm() {},
  mediaFile: {},
  setMediaFile() {},
  mediaLibrary: [],
  setMediaLibrary() {},
  submitUploadForm() {},
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
    const submitUploadForm = () => {
      const data = new FormData();
      data.append('alt', uploadForm.alt);
      data.append('caption', uploadForm.caption);
      uploadForm.processedImages.forEach((photo) => data.append('photos', photo));

      axios
        .post('/api/media-library/upload', data)
        .then((res: AxiosResponse) => {
          console.log('Response data:', res.data.data.mediaLibrary);

          setMediaLibrary((mediaLibrary) => [...res.data.data.mediaLibrary, ...mediaLibrary]);
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
      submitUploadForm,
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
