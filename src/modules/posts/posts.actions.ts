import { NextFunction, Request, Response } from 'express';
import { IS_NUMBER } from 'class-validator';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import postsService from './posts.service';
import PostsInterfaces from './posts.interfaces';
import { ResourceValidationError } from '../../exceptions';

export default {
  async index(_: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postsService.findAll({ status: PostsInterfaces.PostStatus.PUBLIC });

      res.status(StatusCodes.OK).json({
        data: { posts },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async drafted(_: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postsService.findAll({ status: PostsInterfaces.PostStatus.DRAFT });

      res.status(StatusCodes.OK).json({
        data: { posts },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleted(_: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postsService.findAll({ deleted: true });

      res.status(StatusCodes.OK).json({
        data: { posts },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0', 10);
      if (isNaN(id)) {
        throw new ResourceValidationError('post', [
          {
            property: 'id',
            constraints: {
              [IS_NUMBER]: 'id must be a number.',
            },
          },
        ]);
      }

      const post = await postsService.findOne(id);

      res.status(StatusCodes.OK).json({
        data: { post },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postsService.create(req.body);

      res.status(StatusCodes.CREATED).json({
        data: { post },
        status: { code: StatusCodes.CREATED, phrase: ReasonPhrases.CREATED },
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0', 10);
      const post = await postsService.update(id, req.body);

      res.status(StatusCodes.OK).json({
        data: { post },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0', 10);
      await postsService.remove(id);

      res.status(StatusCodes.NO_CONTENT).json({
        status: { code: StatusCodes.NO_CONTENT, phrase: ReasonPhrases.NO_CONTENT },
      });
    } catch (error) {
      next(error);
    }
  },

  async softRemove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0', 10);
      const post = await postsService.softRemove(id);

      res.status(StatusCodes.OK).json({
        data: { post },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },

  async recover(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0', 10);
      const post = await postsService.recover(id);

      res.status(StatusCodes.OK).json({
        data: { post },
        status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
      });
    } catch (error) {
      next(error);
    }
  },
} as PostsInterfaces.IPostsActions;
