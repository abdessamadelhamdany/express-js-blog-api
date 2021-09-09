import { validate, ValidationError } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { User } from './models/User';
import UsersInterfaces from './users.interfaces';

export default {
  async create(params: User): Promise<[UsersInterfaces.SafeUser | undefined, ValidationError[] | undefined]> {
    const userRepository: Repository<User> = getRepository(User);

    const user = userRepository.create(params);

    const errors = await validate(user);
    if (errors.length > 0) {
      return [undefined, errors];
    }

    user.hashPassword();
    await userRepository.save(user);

    return [this.safeUser(user), undefined];
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
