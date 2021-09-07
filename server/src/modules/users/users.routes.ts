import { IRoute } from '@/src/interfaces';

export default [
  {
    path: 'register',
    method: 'post',
    action: 'register',
    description: 'Create new account',
    middlewares: [],
  },
] as IRoute[];
