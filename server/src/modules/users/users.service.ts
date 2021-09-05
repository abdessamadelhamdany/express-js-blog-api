import { validate, ValidationError } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import User from './models/User';
import { SafeUser } from './users.interfaces';

export async function create(params: User): Promise<[SafeUser, ValidationError[]]> {
  const userRepository: Repository<User> = getRepository(User);

  const user = userRepository.create(params);

  const errors = await validate(user);
  if (errors.length > 0) {
    return [null, errors];
  }

  user.hashPassword();
  await userRepository.save(user);

  return [safeUser(user), null];
}

export function safeUser(user: User): SafeUser {
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
}

export default function setupUsersService() {
  return { create };
}
