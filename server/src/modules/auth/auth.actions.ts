import jwt from 'jsonwebtoken';
import * as dateFn from 'date-fns';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { jwtConfig } from '../../config';
import { logger } from '../../loaders';
import AuthInterfaces from './auth.interfaces';
import authService from './auth.service';
import usersService from '../users/users.service';
import { ResourceValidationError, ResourceNotFoundError } from '../../exceptions';

export default {
  async login(req: Request, res: Response) {
    try {
      const user = await authService.getLoggedInUser(req.body);

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
    } catch (error) {
      if (error instanceof ResourceValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: error.errors,
          status: { code: StatusCodes.BAD_REQUEST, phrase: ReasonPhrases.BAD_REQUEST },
        });
      }

      if (error instanceof ResourceNotFoundError) {
        return res.status(StatusCodes.NOT_FOUND).json({
          errors: error.errors,
          status: { code: StatusCodes.NOT_FOUND, phrase: ReasonPhrases.NOT_FOUND },
        });
      }

      logger.error(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie('token').json({
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      logger.error(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: { code: StatusCodes.INTERNAL_SERVER_ERROR, phrase: ReasonPhrases.INTERNAL_SERVER_ERROR },
      });
    }
  },

  async register(req: Request, res: Response) {
    try {
      const user = await usersService.create(req.body);

      const token = jwt.sign({ _id: user.id }, jwtConfig.jwtSecret, { expiresIn: '24h' });
      res.cookie('token', token, {
        httpOnly: true,
        expires: dateFn.addDays(new Date(), 1),
      });

      return res.status(StatusCodes.CREATED).json({
        data: { user },
        status: { code: StatusCodes.CREATED, phrase: ReasonPhrases.CREATED },
      });
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
