import { IRoute } from '@/src/interfaces';

export default [
  {
    path: 'login',
    method: 'post',
    action: 'login',
    description: 'Login users',
    middlewares: [],
  },
] as IRoute[];
