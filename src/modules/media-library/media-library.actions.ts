import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import mediaLibraryService from './media-library.service';
import MediaLibraryInterfaces from './media-library.interfaces';
import localProvider from './providers/local.provider';
import { ResourceValidationError } from 'src/exceptions';

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
    const middleware = localProvider.array('photos');

    return middleware(req, res, async (error) => {
      if (error) {
        next(error);
        return;
      }

      try {
        const mediaLibrary = await mediaLibraryService.create({
          alt: req.body.alt,
          caption: req.body.caption,
          processedImages: req.files as MediaLibraryInterfaces.File[],
        });

        res.status(StatusCodes.CREATED).json({
          data: { mediaLibrary },
          status: { code: StatusCodes.CREATED, phrase: ReasonPhrases.CREATED },
        });
      } catch (error) {
        next(error);
      }
    });
  },
} as MediaLibraryInterfaces.IMediaLibraryActions;
