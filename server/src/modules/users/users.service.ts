import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { User } from './models/User';
import UsersInterfaces from './users.interfaces';
import { ResourceValidationError } from '../../exceptions';

const service = {
  repositories: { user: getRepository(User) },

  helpers: {
    async isAlreadyExist(key: 'email' | 'username', value: string, isUpdate = false): Promise<boolean> {
      return (await service.repositories.user.count({ where: { [key]: [value] } })) > 0;
    },
  },

  async create(params: User): Promise<UsersInterfaces.SafeUser> {
    const user = service.repositories.user.create(params);

    const errors = await validate(user, { validationError: { value: false, target: false } });
    if (errors.length > 0) {
      throw new ResourceValidationError('user', errors);
    }

    const isAlreadyExistsByUsername = await service.helpers.isAlreadyExist('username', params.username);
    if (isAlreadyExistsByUsername) {
      errors.push({
        property: 'username',
        constraints: {
          alreadyExists: 'That username is taken.',
        },
      });

      throw new ResourceValidationError('user', errors);
    }

    const isAlreadyExistsByEmail = await service.helpers.isAlreadyExist('email', params.email);
    if (isAlreadyExistsByEmail) {
      errors.push({
        property: 'email',
        constraints: {
          alreadyExists: 'That email is taken.',
        },
      });

      throw new ResourceValidationError('user', errors);
    }

    user.hashPassword();
    await service.repositories.user.save(user);

    return service.safeUser(user);
  },

  safeUser(user: User): UsersInterfaces.SafeUser {
    return {
      id: user.id,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
      confirmedAt: user.confirmedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  },
};

export default service;
