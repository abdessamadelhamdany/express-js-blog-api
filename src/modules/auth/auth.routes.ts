import { IRoute } from '../../interfaces';

export default [
  {
    name: 'Login',
    path: 'login',
    method: 'post',
    action: 'login',
    description: 'Login users',
    middlewares: [],
  },
  {
    name: 'Logout',
    path: 'logout',
    method: 'post',
    action: 'logout',
    description: 'Logout users',
    middlewares: [],
  },
  {
    name: 'Register',
    path: 'register',
    method: 'post',
    action: 'register',
    description: 'Create new account',
    middlewares: [],
  },
] as IRoute[];
