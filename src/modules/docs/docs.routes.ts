import { IRoute } from '../../interfaces';

export default [
  {
    path: 'docs',
    method: 'get',
    action: 'index',
    description: 'Get api documentation.',
    middlewares: [],
  },
] as IRoute[];
