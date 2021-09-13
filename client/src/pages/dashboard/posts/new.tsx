import Link from 'next/link';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { usePost } from '@/src/hooks';
import { DashboardLayout } from '@/src/layouts';
import { PostProvider } from '@/src/contexts';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { SidebarToggleIcon } from '@/src/components/icons';
import { Status } from '@/src/styles/pages/dashboard/posts/New.styled';
import PostSettings from '@/src/components/pages/dashboard/PostSettings';
import { Flex, ActionsWrapper, LinkAction, IconAction } from '@/src/core-ui/actions';
import { Main, ContainerFluid, Header, Section } from '@/src/core-ui/layouts';
import PostWritingSpace from '@/src/components/pages/dashboard/PostWritingSpace';

export default function NewPost() {
  const { post } = usePost();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PostProvider>
      <DashboardLayout hasNavbar={false}>
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

                {!post.id && (
                  <ActionsWrapper>
                    <LinkAction variant="info">Preview</LinkAction>
                    <LinkAction variant="primary">Publish</LinkAction>
                    <LinkAction variant="secondary">Save Draft</LinkAction>
                    {!isSidebarOpen && (
                      <IconAction variant="secondary" isActive={isSidebarOpen} onClick={() => setIsSidebarOpen(true)}>
                        <SidebarToggleIcon />
                      </IconAction>
                    )}
                  </ActionsWrapper>
                )}
              </Flex>
            </ContainerFluid>
          </Header>

          <Section bgColor="gray.300" canGrow={true} style={{ display: 'flex', flexDirection: 'column' }}>
            <PostWritingSpace />
          </Section>
        </Main>

        <PostSettings isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </DashboardLayout>
    </PostProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
