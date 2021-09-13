import dynamic from 'next/dynamic';
import { ChangeEvent, FC } from 'react';
import { usePost } from '@/src/hooks';
import { slugify } from '@/src/lib/helpers';
import { Container } from '@/src/core-ui/layouts';
import { TitleInput, WritingSpace } from './PostWritingSpace.styled';
import { FormError } from '@/src/core-ui/forms';

const W3Editor = dynamic(() => import('@/src/components/W3Editor'), { ssr: false });

const PostWritingSpace: FC = () => {
  const { post, setPost, hasError, getError } = usePost();

  const updateTitle = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPost((post) => ({ ...post, title: value }));

    if (!post.slugEditedByUser) {
      setPost((post) => ({ ...post, slug: slugify(value) }));
    }
  };

  return (
    <>
      <Container>
        <TitleInput invalid={hasError('title')} value={post.title} onChange={updateTitle} />
        <FormError invalid={hasError('firstName')}>{getError('firstName') || 'no error, congrats!'}</FormError>
      </Container>

      <WritingSpace>
        <W3Editor content={post.content} setContent={(content) => setPost((post) => ({ ...post, content }))} />
      </WritingSpace>
    </>
  );
};

export default PostWritingSpace;
