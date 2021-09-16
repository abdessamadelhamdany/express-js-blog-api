import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import mediaLibraryService from './media-library.service';
import MediaLibraryInterfaces from './media-library.interfaces';
import localProvider from './providers/local.provider';
import multer from 'multer';

export default {
  async index(_: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.OK).json({
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async upload(req: Request, res: Response, next: NextFunction) {
    const middleware = localProvider.single('photo');

    return middleware(req, res, (error) => {
      if (error) {
        next(error);
        return;
      }

      try {
        const file = mediaLibraryService.validateFile('photo', req.file);

        // call service to save file to database

        res.status(StatusCodes.OK).json({
          data: { file },
          status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
        });
      } catch (error) {
        next(error);
      }
    });
  },
} as MediaLibraryInterfaces.IMediaLibraryActions;
