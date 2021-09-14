import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import MediaLibraryInterfaces from './media-library.interfaces';

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

  async upload(_: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.OK).json({
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },
} as MediaLibraryInterfaces.IMediaLibraryActions;
