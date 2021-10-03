import express from 'express';

export interface IRoute {
  name?: string;
  path: string;
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
  action: string | express.Handler;
  description: string;
  middlewares: string[] | express.Handler[];
}
