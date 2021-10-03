import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger } from '../loaders';
import auth from './auth.middleware';
import UsersInterfaces from '../modules/users/users.interfaces';

/**
 * Verify that the authenticated user is an administrator.
 */
export default async function admin(req: Request, res: Response, next: NextFunction) {
  return await auth(req, res, async () => {
    try {
      if (req.user && req.user.role === UsersInterfaces.UserRole.ADMIN) {
        return next();
      }

      res.status(StatusCodes.UNAUTHORIZED).json({
        status: { code: StatusCodes.UNAUTHORIZED, phrase: ReasonPhrases.UNAUTHORIZED },
      });
    } catch (error) {
      logger.error(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  });
}
