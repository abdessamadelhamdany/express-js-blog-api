import { IRoute } from '@/src/interfaces';

export default [
  {
    path: 'posts',
    method: 'get',
    action: 'index',
    description: 'Get all public posts',
    middlewares: ['test'],
  },
  {
    path: 'posts',
    method: 'post',
    action: 'create',
    description: 'Create a new post',
    middlewares: ['global::auth'],
  },
] as IRoute[];
