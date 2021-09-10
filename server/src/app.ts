import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import express, { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import modules from './modules';
import { __prod__ } from './constants';

export default class App {
  public defaultApp: express.Application;

  public constructor() {
    this.defaultApp = express();
    this.registerMiddlewares();
    this.registerModules();
    this.registerDefaultRoutes();
  }

  private defaultHandler(_: Request, res: Response) {
    res.status(StatusCodes.OK).json({
      version: '1.0.0', //Read version from package.json
      status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
    });
  }

  private registerMiddlewares(): void {
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

    /** Handler unhandled requests */
    this.defaultApp.use((_: Request, res: Response, __: NextFunction) => {
      res.status(StatusCodes.NOT_FOUND).send({ status: ReasonPhrases.NOT_FOUND });
    });
  }
}
