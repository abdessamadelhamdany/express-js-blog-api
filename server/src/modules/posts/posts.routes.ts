import { IRoute } from '../../interfaces';

export default [
  {
    path: 'posts',
    method: 'get',
    action: 'index',
    description: 'Get all public posts',
    middlewares: [],
  },
  {
    path: 'posts',
    method: 'post',
    action: 'create',
    description: 'Create a new post',
    middlewares: ['global::auth'],
  },
] as IRoute[];
