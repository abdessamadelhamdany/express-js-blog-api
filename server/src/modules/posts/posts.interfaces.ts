import express from 'express';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLIC = 'public',
}

export interface IPostsActions {
  index: express.Handler;
}
