import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import DocsInterfaces from './docs.interfaces';
import docsService from './docs.service';

export default {
  async index(_: Request, res: Response, next: NextFunction) {
    try {
      const docs = await docsService.getAllApiDocs();

      res.status(StatusCodes.OK).json({
        data: { docs },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },
} as DocsInterfaces.IDocsActions;
