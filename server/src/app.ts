import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as rfs from 'rotating-file-stream';
import express, { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import modules from './modules';
import { __prod__ } from './constants';
import { logger } from './loaders';
import { InvalidTokenError, ResourceNotFoundError, ResourceValidationError } from './exceptions';

export default class App {
  public defaultApp: express.Application;

  public constructor() {
    this.defaultApp = express();
    this.registerStaticDirs();
    this.registerMiddlewares();
    this.registerModules();
    this.registerDefaultRoutes();
  }

  private registerStaticDirs() {
    this.defaultApp.use('/static', express.static(path.join(__dirname, '../static')));
  }

  private defaultHandler(_: Request, res: Response) {
    res.status(StatusCodes.OK).json({
      version: '1.0.0', //Read version from package.json
      status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
    });
  }

  private notFoundHandler(_: Request, res: Response, __: NextFunction) {
    res.status(StatusCodes.NOT_FOUND).json({ status: ReasonPhrases.NOT_FOUND });
  }

  private errorHandler(err: any, __: Request, res: Response, ___: NextFunction) {
    if (err instanceof InvalidTokenError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
      });
    }

    if (err instanceof ResourceValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: err.errors,
        status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
      });
    }

    if (err instanceof ResourceNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: err.errors,
        status: { code: StatusCodes.NOT_FOUND, phrase: ReasonPhrases.NOT_FOUND },
      });
    }

    logger.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
    });
  }

  private registerMiddlewares(): void {
    this.defaultApp.use(cookieParser());
    this.defaultApp.use(express.json());
    this.defaultApp.use(helmet());
    this.defaultApp.use(
      morgan(__prod__ ? 'combined' : 'dev', {
        stream: rfs.createStream('access.log', {
          interval: '1d',
          path: path.join(__dirname, '..', 'logs'),
          teeToStdout: true,
        }),
      }),
    );
  }

  private registerModules(): void {
    const routes = modules.getRoutes();

    routes.forEach((route) => {
      const { path, method, action } = route;

      if (typeof action === 'string') {
        throw `Action ${action} should be of type express.Handler.`;
      }

      const middlewares: express.Handler[] = [];

      route.middlewares.forEach((middleware) => {
        if (typeof middleware === 'string') {
          throw `Middleware ${middleware} should be of type express.Handler.`;
        }

        middlewares.push(middleware);
      });

      this.defaultApp[method](`/${path}`, middlewares, action);
    });
  }

  private registerDefaultRoutes(): void {
    this.defaultApp.get('/', this.defaultHandler);
    this.defaultApp.use(this.notFoundHandler);
    this.defaultApp.use(this.errorHandler);
  }
}
