import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import mediaLibraryService from './media-library.service';
import MediaLibraryInterfaces from './media-library.interfaces';
import localProvider from './providers/local.provider';

export default {
  async index(_: Request, res: Response, next: NextFunction) {
    try {
      const mediaLibrary = await mediaLibraryService.findAll();

      res.status(StatusCodes.OK).json({
        data: { mediaLibrary },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async upload(req: Request, res: Response, next: NextFunction) {
    const middleware = localProvider.single('photo');

    return middleware(req, res, async (error) => {
      if (error) {
        next(error);
        return;
      }

      try {
        const mediaFile = await mediaLibraryService.create('photo', req.file);

        res.status(StatusCodes.CREATED).json({
          data: { mediaFile },
          status: { code: StatusCodes.CREATED, phrase: ReasonPhrases.CREATED },
        });
      } catch (error) {
        next(error);
      }
    });
  },
} as MediaLibraryInterfaces.IMediaLibraryActions;
