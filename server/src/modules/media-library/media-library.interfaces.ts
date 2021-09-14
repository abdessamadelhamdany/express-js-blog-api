import express from 'express';

namespace MediaLibraryInterfaces {
  export interface File {}
  export interface Photo {}
  export interface Folder {}

  export interface IMediaLibraryActions {
    index: express.Handler;
    upload: express.Handler;
  }
}

export default MediaLibraryInterfaces;
