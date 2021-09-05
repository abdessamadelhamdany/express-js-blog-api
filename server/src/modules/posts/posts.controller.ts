import { Router, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Controller } from '@/src/interfaces';
import { getAllPosts } from './posts.service';

const router: Router = Router();

const actions: Controller = [];

actions.push({
  path: 'posts',
  method: 'get',
  handler: async (_: Request, res: Response) => {
    const posts = await getAllPosts();

    res.status(StatusCodes.OK).json({
      posts,
      status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
    });
  },
  middlewares: [],
});

router.get('/');

export default actions;
