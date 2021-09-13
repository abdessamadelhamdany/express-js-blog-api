import React, { useEffect } from 'react';
import PostCard from '../PostCard';
import { usePost } from '@/src/hooks';
import { Post } from '@/src/interfaces';
import { Wrapper, Title, WrapperContent } from './PostsList.styled';

type Props = {
  title?: string;
  posts: Post[];
};

export default function PostsList({ title, posts: originalPosts }: Props) {
  const { setPosts, posts } = usePost();

  useEffect(() => {
    setPosts(originalPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Title>{title || 'Posts'}</Title>

      <WrapperContent>
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </WrapperContent>
    </Wrapper>
  );
}
