import express from 'express';

namespace PostsInterfaces {
  export enum PostStatus {
    DRAFT = 'draft',
    PUBLIC = 'public',
  }

  export interface IPostsActions {
    index: express.Handler;
    drafted: express.Handler;
    deleted: express.Handler;
    show: express.Handler;
    create: express.Handler;
    update: express.Handler;
  }
}

export default PostsInterfaces;
