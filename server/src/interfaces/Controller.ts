import express from 'express';

export interface Action {
  path: string;
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
  handler: express.Handler;
  middlewares: express.Handler[];
}

export type Controller = Action[];
