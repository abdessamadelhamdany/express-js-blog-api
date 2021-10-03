import UsersInterfaces from '../../modules/users/users.interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: UsersInterfaces.SafeUser;
    }
  }
}
