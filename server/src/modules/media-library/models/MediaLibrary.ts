import {
  Column,
  Unique,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class MediaLibrary {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  alt: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ nullable: true })
  fieldname: string;

  @Column({ nullable: true })
  originalname: string;

  @Column({ nullable: true })
  encoding: string;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  size: number;

  @Column({ nullable: true })
  destination: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  path: string;

  @Column({ default: 'local' })
  provider: string;

  // use url to map public to
  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
