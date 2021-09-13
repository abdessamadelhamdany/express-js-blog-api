import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon, ReceiptRefundIcon } from '@heroicons/react/outline';
import { usePost } from '@/src/hooks';
import { Post } from '@/src/interfaces';
import { LinkAction } from '@/src/core-ui/actions';
import { Wrapper, CardHeader, Title, CardContent, CardFooter } from './PostCard.styled';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { remove, softRemove, recover } = usePost();

  return (
    <div>
      <Link href={`/dashboard/posts/edit/${post.id || 0}`} passHref>
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
      <CardFooter>
        <LinkAction
          onClick={(event) => {
            event.preventDefault();

            if (post.deletedAt) {
              remove(post.id || 0);
            } else {
              softRemove(post.id || 0);
            }
          }}
          variant="danger"
        >
          <TrashIcon />
        </LinkAction>
        {post.deletedAt && (
          <LinkAction
            onClick={(event) => {
              event.preventDefault();
              recover(post.id || 0);
            }}
            variant="info"
          >
            <ReceiptRefundIcon />
          </LinkAction>
        )}
      </CardFooter>
    </div>
  );
}
