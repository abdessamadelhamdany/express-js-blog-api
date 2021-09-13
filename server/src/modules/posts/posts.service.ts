import { validate } from 'class-validator';
import { FindConditions, FindManyOptions, getRepository, IsNull, Not } from 'typeorm';
import { Post } from './models/Post';
import PostsInterfaces from './posts.interfaces';
import { ResourceNotFoundError, ResourceValidationError } from '../../../src/exceptions';
import { remove } from 'lodash';

interface FindAllFilters {
  status?: PostsInterfaces.PostStatus;
  deleted?: boolean;
}

const service = {
  helpers: {
    async isAlreadyExists(key: 'slug' | 'id', value: string | number): Promise<boolean> {
      return (await service.repositories.post.count({ where: { [key]: [value] } })) > 0;
    },
  },

  repositories: { post: getRepository(Post) },

  async findAll(filters?: FindAllFilters): Promise<Post[]> {
    const findConditions: FindConditions<Post> = {};

    if (typeof filters?.status !== 'undefined') {
      findConditions.status = filters?.status;
    }

    if (typeof filters?.deleted !== 'undefined') {
      findConditions.deletedAt = filters.deleted ? Not(IsNull()) : IsNull();
    }

    const findManyOptions: FindManyOptions<Post> = { where: findConditions, withDeleted: filters?.deleted };

    return await service.repositories.post.find(findManyOptions);
  },

  async findOne(id: number): Promise<Post> {
    const post = await service.repositories.post.findOne(id);

    if (typeof post === 'undefined') {
      throw new ResourceNotFoundError('post');
    }

    return post;
  },

  async create(params: Post): Promise<Post> {
    const post = service.repositories.post.create(params);

    const errors = await validate(post, { validationError: { value: false, target: false } });
    if (errors.length > 0) {
      throw new ResourceValidationError('post', errors);
    }

    const isAlreadyExistsBySlug = await service.helpers.isAlreadyExists('slug', params.slug);
    if (isAlreadyExistsBySlug) {
      errors.push({
        property: 'slug',
        constraints: {
          alreadyExists: 'That slug is taken.',
        },
      });

      throw new ResourceValidationError('post', errors);
    }

    await service.repositories.post.save(post);

    return post;
  },

  async update(id: number, params: Post): Promise<Post> {
    params.id = id;

    const post = await service.repositories.post.preload(params);
    if (typeof post === 'undefined') {
      throw new ResourceNotFoundError('post');
    }

    const errors = await validate(post, { validationError: { value: false, target: false } });
    if (errors.length > 0) {
      throw new ResourceValidationError('post', errors);
    }

    await service.repositories.post.save(post);

    return post;
  },

  async remove(id: number): Promise<void> {
    const post = await service.repositories.post.findOne(id);

    if (typeof post === 'undefined') {
      throw new ResourceNotFoundError('post');
    }

    await service.repositories.post.remove(post);
  },

  async softRemove(id: number): Promise<Post> {
    const post = await service.repositories.post.findOne(id);

    if (typeof post === 'undefined') {
      throw new ResourceNotFoundError('post');
    }

    return await service.repositories.post.softRemove(post);
  },

  async recover(id: number): Promise<Post> {
    const post = await service.repositories.post.findOne(id, { withDeleted: true });

    if (typeof post === 'undefined') {
      throw new ResourceNotFoundError('post');
    }

    return await service.repositories.post.recover(post);
  },
};

export default service;
