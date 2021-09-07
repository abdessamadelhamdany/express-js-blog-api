namespace UsersInterfaces {
  export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    GUEST = 'guest',
  }

  export interface IUsersActions {}

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
