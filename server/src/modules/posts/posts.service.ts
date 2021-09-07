import { getRepository } from 'typeorm';
import { Post } from './models/Post';

export default {
  async getAllPosts(): Promise<Post[]> {
    const postRepository = getRepository(Post);

    const posts = await postRepository.find();

    return posts;
  },
};
