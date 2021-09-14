import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import usersService from '../modules/users/users.service';

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
    next(error);
  }
}
