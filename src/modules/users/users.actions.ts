import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger } from '../../../src/loaders';
import UsersInterfaces from './users.interfaces';

const actions: UsersInterfaces.IUsersActions = {
  async me(req: Request, res: Response) {
    try {
      return res.json({
        data: { user: req.user },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      logger.error(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  },
};

export default actions;
