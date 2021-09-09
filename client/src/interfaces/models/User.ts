import { Post } from './Post';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GUEST = 'guest',
}

export interface User {
  id?: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  posts?: Post[];
  confirmedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
