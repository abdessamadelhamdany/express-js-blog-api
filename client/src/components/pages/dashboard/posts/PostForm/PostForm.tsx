import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { usePost } from '@/src/hooks';
import { Status } from './PostForm.styled';
import { Post, PostStatus } from '@/src/interfaces';
import { SidebarToggleIcon } from '@/src/components/icons';
import { Main, ContainerFluid, Header, Section } from '@/src/core-ui/layouts';
import { Flex, ActionsWrapper, LinkAction, IconAction } from '@/src/core-ui/actions';
import PostSettings from '@/src/components/pages/dashboard/posts/PostForm/PostSettings';
import PostWritingSpace from '@/src/components/pages/dashboard/posts/PostForm/PostWritingSpace';

interface Props {
  originalPost?: Post;
}

export default function PostForm({ originalPost }: Props) {
  const { post, setPost, saveDraft, savePublic } = usePost();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    originalPost && setPost(originalPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Main>
        <Header p="24px 0 36px">
          <ContainerFluid>
            <Flex items="center" justify="space-between">
              <ActionsWrapper>
                <Link href="/dashboard/posts" passHref>
                  <LinkAction variant="secondary">
                    <ChevronLeftIcon />
                    <span>Posts</span>
                  </LinkAction>
                </Link>

                <Status>{post.status || 'New'}</Status>
              </ActionsWrapper>

              <ActionsWrapper>
                {post.id && (
                  <LinkAction href={`/dashboard/posts/preview/${post.slug}`} target="_blank" variant="info">
                    Preview
                  </LinkAction>
                )}
                <LinkAction variant="primary" onClick={savePublic}>
                  Publish
                </LinkAction>
                <LinkAction variant="secondary" onClick={saveDraft}>
                  {post.status && post.status === PostStatus.PUBLIC ? 'Revert Draft' : 'Save Draft'}
                </LinkAction>
                {!isSidebarOpen && (
                  <IconAction variant="secondary" isActive={isSidebarOpen} onClick={() => setIsSidebarOpen(true)}>
                    <SidebarToggleIcon />
                  </IconAction>
                )}
              </ActionsWrapper>
            </Flex>
          </ContainerFluid>
        </Header>

        <Section bgColor="gray.300" canGrow={true} style={{ display: 'flex', flexDirection: 'column' }}>
          <PostWritingSpace />
        </Section>
      </Main>

      <PostSettings isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
}
