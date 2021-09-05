import { Column, Entity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLIC = 'public',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: false })
  slugEditedByUser?: boolean;

  @Column()
  thumbnail: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ default: 0 })
  viewCount?: number;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status?: PostStatus;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
