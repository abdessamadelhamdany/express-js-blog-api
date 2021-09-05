import authController from './auth/auth.controller';
import usersController from './users/users.controller';
import postsController from './posts/posts.controller';
import { Controller } from '@/src/interfaces';

interface Modules {
  controllers: Controller[];
}

const modules: Modules = {
  controllers: [usersController, authController, postsController],
};

export default modules;
