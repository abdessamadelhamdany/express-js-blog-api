import express from 'express';

namespace PostsInterfaces {
  export enum PostStatus {
    DRAFT = 'draft',
    PUBLIC = 'public',
  }

  export interface IPostsActions {
    index: express.Handler;
  }
}

export default PostsInterfaces;
