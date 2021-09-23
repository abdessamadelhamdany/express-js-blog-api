import sizeOf from 'image-size';
import { ValidationError } from 'class-validator';
import { FindConditions, FindManyOptions, getRepository, IsNull, Not } from 'typeorm';
import { ResourceValidationError } from '../../exceptions';
import MediaLibraryInterfaces from './media-library.interfaces';
import { MediaLibrary } from './models/MediaLibrary';

const service = {
  helpers: {
    safeMediaLibrary(mediaFile: MediaLibrary): MediaLibraryInterfaces.SafeMediaLibrary {
      return {
        id: mediaFile.id,
        alt: mediaFile.alt,
        caption: mediaFile.caption,
        size: mediaFile.size,
        provider: mediaFile.provider,
        path: mediaFile.path,
        width: mediaFile.width,
        height: mediaFile.height,
        mimetype: mediaFile.mimetype,
        createdAt: mediaFile.createdAt,
        updatedAt: mediaFile.updatedAt,
        deletedAt: mediaFile.deletedAt,
      };
    },

    validate(propertyName: string, file?: MediaLibraryInterfaces.File): ValidationError[] {
      const errors: ValidationError[] = [];

      if (!file) {
        errors.push({
          property: propertyName,
          constraints: {
            isNotEmpty: `${propertyName} should not be empty`,
          },
        });
      }

      return errors;
    },
  },

  repositories: {
    mediaLibrary: getRepository(MediaLibrary),
  },

  async findAll(filters?: MediaLibraryInterfaces.FindAllFilters): Promise<MediaLibraryInterfaces.SafeMediaLibrary[]> {
    const findConditions: FindConditions<MediaLibrary> = {};

    if (typeof filters?.deleted !== 'undefined') {
      findConditions.deletedAt = filters.deleted ? Not(IsNull()) : IsNull();
    }

    const findManyOptions: FindManyOptions<MediaLibrary> = {
      where: findConditions,
      order: { createdAt: 'DESC' },
      withDeleted: filters?.deleted,
    };

    const mediaLibrary = await service.repositories.mediaLibrary.find(findManyOptions);

    return mediaLibrary.map((mediaFile) => service.helpers.safeMediaLibrary(mediaFile));
  },

  async create(
    propertyName: string,
    params: MediaLibraryInterfaces.UploadParams,
  ): Promise<MediaLibraryInterfaces.SafeMediaLibrary[]> {
    let errors: ValidationError[] = [];
    const mediaLibrary: MediaLibraryInterfaces.SafeMediaLibrary[] = [];

    if (params.processedImages?.length === 0) {
      errors.push({
        property: propertyName,
        constraints: {
          isNotEmpty: `${propertyName} should not be empty`,
        },
      });
      throw new ResourceValidationError('media-library', errors);
    }

    if (Array.isArray(params.processedImages)) {
      for (const file of params.processedImages) {
        errors = service.helpers.validate(propertyName, file);

        if (errors.length || !file) {
          throw new ResourceValidationError('media-library', errors);
        }

        const { fieldname, mimetype, size, destination, filename, path } = file;

        const { width, height } = sizeOf(path);

        // can be changed to insert, for single query
        const mediaFile = await service.repositories.mediaLibrary.save(
          service.repositories.mediaLibrary.create({
            path,
            size,
            width,
            height,
            filename,
            mimetype,
            fieldname,
            destination,
            caption: params.caption,
            alt: params.alt || file.originalname.replace(/\.[^.]+$/, ''),
          }),
        );

        mediaLibrary.push(service.helpers.safeMediaLibrary(mediaFile));
      }
    }

    return mediaLibrary;
  },
};

export default service;
