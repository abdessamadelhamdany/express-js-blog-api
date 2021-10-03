import { getRepository, Repository } from 'typeorm';
import { isNotEmpty, isEmail, ValidationError } from 'class-validator';
import { User } from '../users/models/User';
import AuthInterfaces from './auth.interfaces';
import usersService from '../users/users.service';
import UsersInterfaces from '../users/users.interfaces';
import { ResourceValidationError, ResourceNotFoundError } from '../../exceptions';

const service = {
  repositories: { user: getRepository(User) },

  helpers: {
    validate(params: AuthInterfaces.LoginParams): ValidationError[] {
      const errors: ValidationError[] = [];
      const { username, password } = params;

      if (!isNotEmpty(username)) {
        errors.push({
          property: 'username',
          constraints: {
            isNotEmpty: 'username should not be empty',
          },
        });
      } else if (!isEmail(username)) {
        errors.push({
          property: 'username',
          constraints: {
            isEmail: 'username must be an email',
          },
        });
      }

      if (!isNotEmpty(password)) {
        errors.push({
          property: 'password',
          constraints: {
            isNotEmpty: 'password should not be empty',
          },
        });
      }

      return errors;
    },
  },

  async getLoggedInUser(params: AuthInterfaces.LoginParams): Promise<UsersInterfaces.SafeUser> {
    const errors = service.helpers.validate(params);
    if (errors.length > 0) {
      throw new ResourceValidationError('user', errors);
    }

    const user = await service.repositories.user.findOne({ where: { email: params.username } });
    if (!user || !user.verifyPassword(params.password)) {
      errors.push({
        property: 'username',
        constraints: {
          isNotEmpty: 'invalid credentials',
        },
      });

      throw new ResourceNotFoundError('user', errors);
    }

    return usersService.helpers.safeUser(user);
  },
};

export default service;
