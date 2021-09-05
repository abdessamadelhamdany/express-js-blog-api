import React from 'react';
import { Post } from 'server/blog/posts/models/Post';
import { PostCard } from '..';
import { Wrapper, Title, WrapperContent } from './RecentPosts.styled';

type Props = {
  posts: Post[];
};

export default function RecentPosts({ posts }: Props) {
  return (
    <Wrapper>
      <Title>Recent posts</Title>

      <WrapperContent>
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </WrapperContent>
    </Wrapper>
  );
}
