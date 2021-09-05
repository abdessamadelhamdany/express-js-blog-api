import cors from 'cors';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import { Controller } from '@/src/interfaces';
import { postsController } from './modules/posts';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export default class App {
  public origin: string[];
  public defaultApp: express.Application;

  public constructor() {
    this.origin = process.env.ORIGIN.split(',') || ['http://localhost:1774'];
    this.defaultApp = express();

    this.registerMiddlewares();
    this.resgiterControllers();
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

  private resgiterControllers(): void {
    const controllers: Controller[] = [postsController];

    controllers.forEach((controller) => {
      controller.forEach((action) => {
        const { path, method, handler, middlewares } = action;

        this.defaultApp[method](`/api/${path}`, middlewares, handler);
      });
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
