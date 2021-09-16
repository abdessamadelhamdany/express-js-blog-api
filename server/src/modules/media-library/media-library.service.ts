import { ValidationError } from 'class-validator';
import { getRepository } from 'typeorm';
import { ResourceValidationError } from '../../exceptions';
import MediaLibraryInterfaces from './media-library.interfaces';
import { MediaLibrary } from './models/MediaLibrary';

const service = {
  helpers: {
    safeMediaLibrary(mediaLibrary: MediaLibrary): MediaLibraryInterfaces.SafeMediaLibrary {
      return {
        id: mediaLibrary.id,
        alt: mediaLibrary.alt,
        caption: mediaLibrary.caption,
        size: mediaLibrary.size,
        provider: mediaLibrary.provider,
        width: mediaLibrary.width,
        height: mediaLibrary.height,
        mimetype: mediaLibrary.mimetype,
        createdAt: mediaLibrary.createdAt,
        updatedAt: mediaLibrary.updatedAt,
        deletedAt: mediaLibrary.deletedAt,
      };
    },

    validate(file?: MediaLibraryInterfaces.File): ValidationError[] {
      const errors: ValidationError[] = [];

      if (!file) {
        errors.push({
          property: 'file',
          constraints: {
            isNotEmpty: `file should not be empty`,
          },
        });
      }

      return errors;
    },
  },

  repositories: {
    mediaLibrary: getRepository(MediaLibrary),
  },

  async create(file?: MediaLibraryInterfaces.File): Promise<MediaLibraryInterfaces.SafeMediaLibrary> {
    const errors = service.helpers.validate(file);

    if (errors.length || !file) {
      throw new ResourceValidationError('media-library', errors);
    }

    const alt = file.originalname.replace(/\.[^.]+$/, '');
    const { fieldname, mimetype, size, destination, filename, path } = file;

    const mediaLibrary = await service.repositories.mediaLibrary.save(
      service.repositories.mediaLibrary.create({
        alt,
        path,
        size,
        filename,
        mimetype,
        fieldname,
        destination,
      }),
    );

    return service.helpers.safeMediaLibrary(mediaLibrary);
  },
};

export default service;
