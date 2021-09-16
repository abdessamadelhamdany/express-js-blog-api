export interface MediaLibrary {
  id?: number;
  path?: string;
  alt?: string;
  caption?: string;
  size?: number;
  provider?: string;
  width?: number;
  height?: number;
  mimetype?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
