import jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { User } from './models/User';
import { jwtConfig } from '../../config';
import UsersInterfaces from './users.interfaces';
import { InvalidTokenError, ResourceNotFoundError, ResourceValidationError } from '../../exceptions';

const service = {
  helpers: {
    async isAlreadyExists(key: 'email' | 'username', value: string, isUpdate = false): Promise<boolean> {
      return (await service.repositories.user.count({ where: { [key]: [value] } })) > 0;
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
  },

  repositories: { user: getRepository(User) },

  async me(token: string): Promise<UsersInterfaces.SafeUser> {
    let _id;

    try {
      const decoded = jwt.verify(token, jwtConfig.jwtSecret) as jwt.JwtPayload;
      _id = decoded._id;
    } catch (_) {
      throw new InvalidTokenError();
    }

    const user = await this.repositories.user.findOne(_id);
    if (!user) {
      throw new ResourceNotFoundError('user');
    }

    return this.helpers.safeUser(user);
  },

  async create(params: User): Promise<UsersInterfaces.SafeUser> {
    const user = service.repositories.user.create(params);

    const errors = await validate(user, { validationError: { value: false, target: false } });
    if (errors.length > 0) {
      throw new ResourceValidationError('user', errors);
    }

    const isAlreadyExistsByUsername = await service.helpers.isAlreadyExists('username', params.username);
    if (isAlreadyExistsByUsername) {
      errors.push({
        property: 'username',
        constraints: {
          alreadyExists: 'That username is taken.',
        },
      });

      throw new ResourceValidationError('user', errors);
    }

    const isAlreadyExistsByEmail = await service.helpers.isAlreadyExists('email', params.email);
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

    return service.helpers.safeUser(user);
  },
};

export default service;
