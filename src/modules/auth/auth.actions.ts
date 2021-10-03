import jwt from 'jsonwebtoken';
import * as dateFn from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { jwtConfig } from '../../config';
import authService from './auth.service';
import AuthInterfaces from './auth.interfaces';
import usersService from '../users/users.service';

export default {
  async login(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  },

  async logout(_: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('token').json({
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async register(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  },
} as AuthInterfaces.IAuthActions;
