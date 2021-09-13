import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Post } from './models/Post';
import { ResourceNotFoundError, ResourceValidationError } from '../../../src/exceptions';

const service = {
  helpers: {
    async isAlreadyExists(key: 'slug' | 'id', value: string | number): Promise<boolean> {
      return (await service.repositories.post.count({ where: { [key]: [value] } })) > 0;
    },
  },

  repositories: { post: getRepository(Post) },

  async getAllPosts(): Promise<Post[]> {
    const posts = await service.repositories.post.find();

    return posts;
  },

  async update(id: number, params: Post): Promise<Post> {
    params.id = id;

    // const isAlreadyExistsById = await service.helpers.isAlreadyExists('id', params.id);
    // if (isAlreadyExistsById) {
    //   throw new ResourceNotFoundError('post');
    // }

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
};
export default service;
