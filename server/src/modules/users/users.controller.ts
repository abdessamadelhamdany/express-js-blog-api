import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { create } from './users.service';
import { jwtConfig } from '../../config';
import { Controller } from '@/src/interfaces';

const actions: Controller = [];

actions.push({
  path: 'register',
  method: 'post',
  handler: async (req: Request, res: Response) => {
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
  middlewares: [],
});

export default actions;
