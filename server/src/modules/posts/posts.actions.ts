import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import postsService from './posts.service';
import PostsInterfaces from './posts.interfaces';
import { logger } from '../../../src/loaders';
import { ResourceNotFoundError, ResourceValidationError } from '../../exceptions';

export default {
  async index(_: Request, res: Response) {
    const posts = await postsService.findAll();

    res.status(StatusCodes.OK).json({
      data: { posts },
      status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
    });
  },

  async show(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id || '0', 10);
      const post = await postsService.findOne(id);

      res.status(StatusCodes.OK).json({
        data: { post },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
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

  async create(req: Request, res: Response) {
    try {
      const post = await postsService.create(req.body);

      res.status(StatusCodes.CREATED).json({
        data: { post },
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

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id || '0', 10);
      const post = await postsService.update(id, req.body);

      res.status(StatusCodes.OK).json({
        data: { post },
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
} as PostsInterfaces.IPostsActions;
