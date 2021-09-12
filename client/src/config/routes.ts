import { UserRole } from '../interfaces';

export const routesConfig: RoutesConfig = {
  guest: ['/auth/*'],
  protected: {
    '/dashboard/*': [UserRole.ADMIN, UserRole.GUEST],
  },
};

interface RoutesConfig {
  guest: string[];
  protected: {
    [key: string]: string[];
  };
}
