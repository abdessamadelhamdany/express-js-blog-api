import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import postsService from './posts.service';
import PostsInterfaces from './posts.interfaces';

export default {
  async index(_: Request, res: Response) {
    const posts = await postsService.getAllPosts();

    res.status(StatusCodes.OK).json({
      posts,
      status: { code: StatusCodes.OK, phrase: ReasonPhrases.OK },
    });
  },
  async create(_: Request, res: Response) {
    res.status(StatusCodes.CREATED).json({
      status: { code: StatusCodes.CREATED, phrase: ReasonPhrases.CREATED },
    });
  },
} as PostsInterfaces.IPostsActions;
