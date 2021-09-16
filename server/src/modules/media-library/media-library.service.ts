import { ResourceValidationError } from '../../exceptions';
import MediaLibraryInterfaces from './media-library.interfaces';

const service = {
  helpers: {},

  repositories: {},

  validateFile(fieldname: string, file?: MediaLibraryInterfaces.File): MediaLibraryInterfaces.File {
    if (!file) {
      throw new ResourceValidationError('media-library', [
        {
          property: fieldname,
          constraints: {
            isNotEmpty: `${fieldname} should not be empty`,
          },
        },
      ]);
    }

    return file;
  },
};

export default service;
