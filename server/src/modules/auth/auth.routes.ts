import { IRoute } from '@/src/interfaces';

export default [
  {
    path: 'login',
    method: 'post',
    action: 'login',
    description: 'Login users',
    middlewares: [],
  },
  {
    path: 'register',
    method: 'post',
    action: 'register',
    description: 'Create new account',
    middlewares: [],
  },
] as IRoute[];
