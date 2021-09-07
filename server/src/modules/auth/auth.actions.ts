import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { login } from './auth.service';
import { jwtConfig } from '../../config';
import { IAuthActions } from './auth.interfaces';

export default {
  async login(req: Request, res: Response) {
    try {
      const [user, errors] = await login(req.body);

      if (errors) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors,
          status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
        });
      }

      if (user) {
        const token = jwt.sign({ userId: user.id, email: user.email }, jwtConfig.jwtSecret, {
          expiresIn: req.body.remember ? '7d' : '24h',
        });

        return res.status(StatusCodes.OK).json({
          token,
          user,
          status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
        });
      }

      res.status(StatusCodes.UNAUTHORIZED).json({
        status: { code: StatusCodes.UNAUTHORIZED, phrase: ReasonPhrases.UNAUTHORIZED },
      });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  },
} as IAuthActions;