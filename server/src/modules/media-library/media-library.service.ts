import sizeOf from 'image-size';
import { ValidationError } from 'class-validator';
import { FindConditions, FindManyOptions, getRepository, IsNull, Not } from 'typeorm';
import { ResourceValidationError } from '../../exceptions';
import MediaLibraryInterfaces from './media-library.interfaces';
import { MediaLibrary } from './models/MediaLibrary';
import { MediaFile } from './models/MediaFile';

const service = {
  helpers: {
    validate(files: MediaLibraryInterfaces.File[]): ValidationError[] {
      const errors: ValidationError[] = [];

      if (files.length === 0) {
        errors.push({
          property: 'photos',
          constraints: {
            isNotEmpty: `photos should not be empty`,
          },
        });
      }

      return errors;
    },
  },

  repositories: {
    mediaLibrary: getRepository(MediaLibrary),
  },

  async findAll(filters?: MediaLibraryInterfaces.FindAllFilters): Promise<MediaLibrary[]> {
    const findConditions: FindConditions<MediaLibrary> = {};

    if (typeof filters?.deleted !== 'undefined') {
      findConditions.deletedAt = filters.deleted ? Not(IsNull()) : IsNull();
    }

    const findManyOptions: FindManyOptions<MediaLibrary> = {
      where: findConditions,
      order: { createdAt: 'DESC' },
      relations: ['mediaFiles'],
      withDeleted: filters?.deleted,
    };

    return await service.repositories.mediaLibrary.find(findManyOptions);
  },

  async create(params: MediaLibraryInterfaces.UploadParams, provider: string = 'local'): Promise<MediaLibrary> {
    const errors = service.helpers.validate(params.processedImages);
    if (errors.length) {
      throw new ResourceValidationError('photos', errors);
    }

    let fileOriginalname: string = '';
    const mediaFiles: MediaFile[] = [];

    for (const file of params.processedImages) {
      const { width, height } = sizeOf(file.path);

      if (fileOriginalname === '') {
        fileOriginalname = file.originalname;
      }

      const mediaFile = new MediaFile();
      mediaFile.mimetype = file.mimetype;
      mediaFile.size = file.size;
      mediaFile.path = file.path;
      mediaFile.width = width || 0;
      mediaFile.height = height || 0;

      mediaFiles.push(mediaFile);
    }

    const mediaLibrary = new MediaLibrary();
    mediaLibrary.provider = provider;
    mediaLibrary.caption = params.caption;
    mediaLibrary.alt = params.alt || fileOriginalname.replace(/\.[^.]+$/, '');
    mediaLibrary.mediaFiles = mediaFiles;

    return await service.repositories.mediaLibrary.save(mediaLibrary);
  },
};

export default service;
