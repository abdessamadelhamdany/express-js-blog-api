import axios, { AxiosError, AxiosResponse } from 'axios';
import { createContext, Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useValidationState } from '../hooks';
import { ValidationError } from '../interfaces';
import { MediaLibrary } from '../interfaces/models/MediaLibrary';

export interface MediaLibraryUploadForm {
  alt: string;
  caption: string;
  filename: string;
  processedImages: Blob[];
}

export interface IMediaLibraryContext {
  insertedImage: string | undefined;
  setInsertedImage: Dispatch<SetStateAction<string | undefined>>;
  isMediaLibraryModalOpen: boolean;
  setIsMediaLibraryModalOpen: Dispatch<SetStateAction<boolean>>;
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
  insertedImage: undefined,
  setInsertedImage() {},
  isMediaLibraryModalOpen: false,
  setIsMediaLibraryModalOpen() {},
  uploadForm: {
    alt: '',
    caption: '',
    filename: '',
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
  const [insertedImage, setInsertedImage] = useState<string | undefined>(undefined);
  const [mediaLibrary, setMediaLibrary] = useState<MediaLibrary[]>(initialState.mediaLibrary);
  const [uploadForm, setUploadForm] = useState<MediaLibraryUploadForm>(initialState.uploadForm);
  const [isMediaLibraryModalOpen, setIsMediaLibraryModalOpen] = useState<boolean>(initialState.isMediaLibraryModalOpen);

  const memoedValue = useMemo(() => {
    const submitUploadForm = () => {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('alt', uploadForm.alt);
        data.append('caption', uploadForm.caption);
        uploadForm.processedImages.forEach((photo) => data.append('photos', photo, uploadForm.filename));

        axios
          .post('/api/media-library/upload', data)
          .then((res: AxiosResponse) => {
            let uploadedMediaLibrary: MediaLibrary = res.data.data.mediaLibrary;

            if (uploadedMediaLibrary.mediaFiles) {
              uploadedMediaLibrary.mediaFiles = [
                uploadedMediaLibrary.mediaFiles.reduce((previous, current) => {
                  const currentWidth = current.width || 0;
                  const previousWidth = previous.width || 0;

                  return currentWidth > previousWidth ? current : previous;
                }),
              ];
            }

            setMediaLibrary((mediaLibrary) => [uploadedMediaLibrary, ...mediaLibrary]);
            resolve(res);
          })
          .catch((err: AxiosError) => {
            if (err.response && [400].includes(err.response.status) && err.response.data.errors) {
              setErrors(err.response.data.errors);
            }
            reject(err);
          });
      });
    };

    return {
      insertedImage,
      setInsertedImage,
      isMediaLibraryModalOpen,
      setIsMediaLibraryModalOpen,
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
    insertedImage,
    setInsertedImage,
    isMediaLibraryModalOpen,
    setIsMediaLibraryModalOpen,
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
