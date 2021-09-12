import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import React, { ChangeEvent, useState } from 'react';

import { usePostForm } from '@/src/hooks';
import { slugify } from '@/src/lib/helpers';
import { DashboardLayout } from '@/src/layouts';
import { PostFormProvider } from '@/src/contexts';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { SidebarToggleIcon } from '@/src/components/icons';
import PostSettings from '@/src/components/pages/dashboard/PostSettings';
import { Flex, ActionsWrapper, LinkAction, IconAction } from '@/src/core-ui/actions';
import { Main, ContainerFluid, Header, Section, Container } from '@/src/core-ui/layouts';
import { Status, TitleInput, WritingSpace } from '@/src/styles/pages/dashboard/posts/New.styled';

const W3Editor = dynamic(() => import('@/src/components/W3Editor'), { ssr: false });

export default function NewPost() {
  const { postForm, setPostForm } = usePostForm();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateTitle = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!postForm.slugEditedByUser) {
      setPostForm({ ...postForm, title: value, slug: slugify(value) });
    } else {
      setPostForm({ ...postForm, title: value });
    }
  };

  return (
    <PostFormProvider>
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

                  <Status>{postForm.status || 'New'}</Status>
                </ActionsWrapper>

                {!postForm.id && (
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

          <Section canGrow={true}>
            <Container>
              <TitleInput value={postForm.title} onChange={updateTitle} />
            </Container>

            <WritingSpace>
              <W3Editor content={postForm.content} setContent={(content) => setPostForm({ ...postForm, content })} />
            </WritingSpace>
          </Section>
        </Main>

        <PostSettings isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </DashboardLayout>
    </PostFormProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
