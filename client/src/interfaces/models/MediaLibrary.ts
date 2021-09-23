import { MediaFile } from './MediaFile';

export interface MediaLibrary {
  id?: number;
  alt?: string;
  caption?: string;
  provider?: string;
  mediaFiles?: MediaFile[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
