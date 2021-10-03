import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { MediaFile } from './MediaFile';

@Entity()
export class MediaLibrary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  alt: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ default: 'local' })
  provider: string;

  @OneToMany(() => MediaFile, (mediaFiles) => mediaFiles.mediaLibrary, {
    cascade: true,
  })
  mediaFiles: MediaFile[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
