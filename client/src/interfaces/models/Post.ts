export enum PostStatus {
  DRAFT = 'draft',
  PUBLIC = 'public',
}

export interface Post {
  id?: number;
  title: string;
  slug: string;
  slugEditedByUser?: boolean;
  thumbnail: string;
  description: string;
  excerpt: string;
  content: string;
  viewCount?: number;
  status?: PostStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
