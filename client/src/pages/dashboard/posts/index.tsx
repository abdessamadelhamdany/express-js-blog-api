import { GetServerSideProps } from 'next';
import { Post, PostStatus } from '@/src/interfaces';

export { default } from '@/src/views/dashboard/posts/Home';

export type Props = {
  recentPosts: Post[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let recentPosts: any[] = require('@/src/assets/dummy/posts.json');

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  recentPosts = recentPosts
    .map((post) => ({
      status: PostStatus.PUBLIC,
      viewCount: getRandomInt(50, 5000),
      updatedAt: new Date().toString(),
      createdAt: new Date().toString(),
      ...post,
    }))
    .slice(0, 4);

  return {
    props: {
      recentPosts,
    },
  };
};
