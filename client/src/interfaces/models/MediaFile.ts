import { MediaLibrary } from './MediaLibrary';

export interface MediaFile {
  id?: number;
  mimetype?: string;
  size?: number;
  path?: string;
  width?: number;
  height?: number;
  mediaLibrary?: MediaLibrary;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
