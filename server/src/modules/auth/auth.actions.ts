import jwt from 'jsonwebtoken';
import * as dateFn from 'date-fns';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import authService from './auth.service';
import { jwtConfig } from '../../config';
import { logger } from '../../loaders';
import AuthInterfaces from './auth.interfaces';
import usersService from '../users/users.service';
import { ResourceValidationError } from '../../exceptions';

export default {
  async login(req: Request, res: Response) {
    try {
      const [user, errors] = await authService.login(req.body);

      if (errors) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors,
          status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
        });
      }

      if (user) {
        const token = jwt.sign({ _id: user.id }, jwtConfig.jwtSecret, {
          expiresIn: req.body.remember ? '7d' : '24h',
        });

        res.cookie('token', token, {
          httpOnly: true,
          expires: dateFn.addDays(new Date(), req.body.remember ? 7 : 1),
        });

        return res.status(StatusCodes.OK).json({
          data: { user },
          status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
        });
      }

      res.status(StatusCodes.UNAUTHORIZED).json({
        status: { code: StatusCodes.UNAUTHORIZED, phrase: ReasonPhrases.UNAUTHORIZED },
      });
    } catch (err) {
      logger.error(err);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  },

  async register(req: Request, res: Response) {
    try {
      const user = await usersService.create(req.body);

      if (user) {
        const token = jwt.sign({ _id: user.id }, jwtConfig.jwtSecret, { expiresIn: '24h' });

        res.cookie('token', token, {
          httpOnly: true,
          expires: dateFn.addDays(new Date(), 1),
        });

        return res.status(StatusCodes.CREATED).json({
          data: { user },
          status: { code: StatusCodes.CREATED, phrase: ReasonPhrases.CREATED },
        });
      }
    } catch (error) {
      if (error instanceof ResourceValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: error.errors,
          status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
        });
      }

      logger.error(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  },
} as AuthInterfaces.IAuthActions;
