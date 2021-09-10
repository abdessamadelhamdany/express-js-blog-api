import { getRepository, Repository } from 'typeorm';
import { isNotEmpty, isEmail, ValidationError } from 'class-validator';
import { User } from '../users/models/User';
import AuthInterfaces from './auth.interfaces';
import usersService from '../users/users.service';
import UsersInterfaces from '../users/users.interfaces';

export default {
  async login(
    params: AuthInterfaces.LoginParams,
  ): Promise<[UsersInterfaces.SafeUser | undefined, ValidationError[] | undefined]> {
    const errors = this.validate(params);

    if (errors.length > 0) {
      return [undefined, errors];
    }

    const { username, password } = params;
    const userRepository: Repository<User> = getRepository(User);

    const user = await userRepository.findOne({ email: username });
    if (user) {
      if (!user.verifyPassword(password)) {
        return [undefined, undefined];
      }

      return [usersService.safeUser(user), undefined];
    }

    return [undefined, undefined];
  },

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
};
