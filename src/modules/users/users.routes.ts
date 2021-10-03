import { IRoute } from '../../interfaces';

export default [
  {
    name: 'Users me',
    path: 'users/me',
    method: 'get',
    action: 'me',
    description: 'Get logged in user',
    middlewares: ['global::auth'],
  },
] as IRoute[];
