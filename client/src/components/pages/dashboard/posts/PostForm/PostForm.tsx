import Link from 'next/link';
import React, { useState } from 'react';
import { usePost } from '@/src/hooks';
import { Status } from './PostForm.styled';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { SidebarToggleIcon } from '@/src/components/icons';
import { Main, ContainerFluid, Header, Section } from '@/src/core-ui/layouts';
import { Flex, ActionsWrapper, LinkAction, IconAction } from '@/src/core-ui/actions';
import PostSettings from '@/src/components/pages/dashboard/posts/PostForm/PostSettings';
import PostWritingSpace from '@/src/components/pages/dashboard/posts/PostForm/PostWritingSpace';

export default function PostForm() {
  const { post, saveDraft, savePublic } = usePost();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                  Save Draft
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
