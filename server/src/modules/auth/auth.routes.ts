import { IRoute } from '../../interfaces';

export default [
  {
    path: 'login',
    method: 'post',
    action: 'login',
    description: 'Login users',
    middlewares: [],
  },
  {
    path: 'logout',
    method: 'post',
    action: 'logout',
    description: 'Logout users',
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
