import { getRepository } from 'typeorm';
import { Post } from './models/Post';

export async function getAllPosts(): Promise<Post[]> {
  const postRepository = getRepository(Post);

  const posts = await postRepository.find();

  return posts;
}
