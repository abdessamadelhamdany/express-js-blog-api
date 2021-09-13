import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/src/interfaces';
import { Wrapper, CardHeader, Title, CardContent } from './PostCard.styled';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/dashboard/posts/edit/${post.id}`} passHref>
      <Wrapper>
        <CardHeader>
          <Image
            src={post.thumbnail || '/media/images/posts/product-design-steps.jpeg'}
            alt={post.title}
            layout="responsive"
            width={720}
            height={540}
            objectFit="cover"
          />
        </CardHeader>

        <CardContent>
          <Title>{post.title}</Title>
        </CardContent>
      </Wrapper>
    </Link>
  );
}
