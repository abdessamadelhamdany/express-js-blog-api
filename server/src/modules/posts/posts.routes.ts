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
    path: 'posts/drafted',
    method: 'get',
    action: 'drafted',
    description: 'Get all drafted posts',
    middlewares: ['global::admin'],
  },
  {
    path: 'posts/deleted',
    method: 'get',
    action: 'deleted',
    description: 'Get all deleted posts',
    middlewares: ['global::admin'],
  },
  {
    path: 'posts/:id',
    method: 'get',
    action: 'show',
    description: 'Get single post',
    middlewares: [],
  },
  {
    path: 'posts',
    method: 'post',
    action: 'create',
    description: 'Create a new post',
    middlewares: ['global::auth'],
  },
  {
    path: 'posts/:id',
    method: 'put',
    action: 'update',
    description: 'Update a post',
    middlewares: ['global::auth'],
  },
  {
    path: 'posts/:id',
    method: 'delete',
    action: 'remove',
    description: 'Remove a single post',
    middlewares: [],
  },
  {
    path: 'posts/:id/soft-delete',
    method: 'delete',
    action: 'softRemove',
    description: 'Soft remove a single post',
    middlewares: [],
  },
  {
    path: 'posts/:id/recover',
    method: 'post',
    action: 'recover',
    description: 'Recover a single post',
    middlewares: [],
  },
] as IRoute[];
