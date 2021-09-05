import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wrapper, CardHeader, Title, CardContent } from './PostCard.styled';
import { Post } from 'server/blog/posts/models/Post';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/dashboard/posts/edit/${post.id}`} passHref>
      <Wrapper>
        <CardHeader>
          <Image src={post.thumbnail} alt={post.title} layout="responsive" width={720} height={540} objectFit="cover" />
        </CardHeader>

        <CardContent>
          <Title>{post.title}</Title>
        </CardContent>
      </Wrapper>
    </Link>
  );
}
