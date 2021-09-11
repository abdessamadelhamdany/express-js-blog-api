import express from 'express';

namespace UsersInterfaces {
  export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    GUEST = 'guest',
  }

  export interface IUsersActions {
    me: express.Handler;
  }

  export interface SafeUser {
    id: number;
    avatar?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: UserRole;
    confirmedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
}

export default UsersInterfaces;
