import bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Length, IsOptional, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import UsersInterfaces from '../users.interfaces';

@Entity()
@Unique(['email', 'username'])
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  avatar: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @Column({
    type: 'enum',
    enum: UsersInterfaces.UserRole,
    default: UsersInterfaces.UserRole.GUEST,
  })
  @IsEnum(UsersInterfaces.UserRole)
  @IsOptional()
  role: UsersInterfaces.UserRole;

  @Column({ nullable: true })
  confirmedAt: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  verifyPassword(hashedPassword: string) {
    return bcrypt.compareSync(hashedPassword, this.password);
  }
}
