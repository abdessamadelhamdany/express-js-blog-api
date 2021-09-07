import {
  Column,
  Unique,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import PostsInterfaces from '../posts.interfaces';

@Entity()
@Unique(['slug'])
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  slug: string;

  @Column({ default: false })
  slugEditedByUser?: boolean;

  @Column()
  @IsNotEmpty()
  @IsOptional()
  thumbnail: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ type: 'longtext', nullable: true })
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @Column({ default: 0 })
  viewCount?: number;

  @Column({
    type: 'enum',
    enum: PostsInterfaces.PostStatus,
    default: PostsInterfaces.PostStatus.DRAFT,
  })
  @IsEnum(PostsInterfaces.PostStatus)
  status?: PostsInterfaces.PostStatus;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
