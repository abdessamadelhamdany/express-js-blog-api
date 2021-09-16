import express, { Express } from 'express';

namespace MediaLibraryInterfaces {
  export type File = Express.Multer.File;
  export interface Folder {}

  export interface IMediaLibraryActions {
    index: express.Handler;
    upload: express.Handler;
  }

  export interface FindAllFilters {
    deleted?: boolean;
  }

  export interface SafeMediaLibrary {
    id: number;
    path?: string;
    alt?: string;
    caption?: string;
    size?: number;
    provider?: string;
    width?: number;
    height?: number;
    mimetype?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
}

export default MediaLibraryInterfaces;
