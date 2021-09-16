import express, { Express } from 'express';

namespace MediaLibraryInterfaces {
  export type File = Express.Multer.File;
  export interface Folder {}

  export interface IMediaLibraryActions {
    index: express.Handler;
    upload: express.Handler;
  }
}

export default MediaLibraryInterfaces;
