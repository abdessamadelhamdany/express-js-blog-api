import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { jwtConfig } from '../../config';
import { create } from './users.service';
import { IUsersActions } from './users.interfaces';

export default {
  async register(req: Request, res: Response) {
    try {
      const [user, errors] = await create(req.body);

      if (errors) {
        res.status(StatusCodes.BAD_REQUEST).json({
          errors,
          status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
        });
      }

      if (user) {
        const token = jwt.sign({ userId: user.id, email: user.email }, jwtConfig.jwtSecret, { expiresIn: '24h' });

        return res.status(StatusCodes.CREATED).json({
          token,
          user,
          status: { code: StatusCodes.CREATED, phrase: ReasonPhrases.CREATED },
        });
      }
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  },
} as IUsersActions;
