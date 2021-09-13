import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger } from '../loaders';
import usersService from '../modules/users/users.service';
import { ResourceNotFoundError, InvalidTokenError } from '../exceptions';

/**
 * Verify that a valid token was provided
 * Either through cookie or Bearer Authorization header
 */
export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const cookieToken = req.cookies.token;
    if (cookieToken && typeof cookieToken === 'string') {
      req.user = await usersService.me(cookieToken);
      return next();
    }

    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.includes('Bearer ')) {
      req.user = await usersService.me(authorizationHeader.replace('Bearer ', ''));
      return next();
    }

    res
      .clearCookie('token')
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        status: { code: StatusCodes.UNAUTHORIZED, phrase: ReasonPhrases.UNAUTHORIZED },
      });
  } catch (error) {
    logger.error(error);

    if (error instanceof InvalidTokenError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
      });
    }

    if (error instanceof ResourceNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: { code: StatusCodes.NOT_FOUND, phrase: ReasonPhrases.NOT_FOUND },
      });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
    });
  }
}
