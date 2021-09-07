import cors from 'cors';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import modules from './modules';

export default class App {
  public origin: string[];
  public defaultApp: express.Application;

  public constructor() {
    this.origin = process.env.ORIGIN.split(',') || ['http://localhost:1774'];
    this.defaultApp = express();

    this.registerMiddlewares();
    this.registerModules();
    this.registerDefaultRoutes();
  }

  private defaultHandler(_: Request, res: Response) {
    res.status(StatusCodes.OK).json({
      status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
    });
  }

  private registerMiddlewares(): void {
    this.defaultApp.use(express.json());
    this.defaultApp.use(cors({ origin: this.origin }));
    this.defaultApp.use(helmet());
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

      this.defaultApp[method](`/api/${path}`, middlewares, action);
    });
  }

  private registerDefaultRoutes(): void {
    this.defaultApp.get('/', this.defaultHandler);
    this.defaultApp.get('/api', this.defaultHandler);

    /** Handler unhandled requests */
    this.defaultApp.use((_: Request, res: Response, __: NextFunction) => {
      res.status(StatusCodes.NOT_FOUND).send({ status: ReasonPhrases.NOT_FOUND });
    });
  }
}
