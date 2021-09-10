import Link from 'next/link';
import dynamic from 'next/dynamic';
import React, { FC, ChangeEvent, useMemo, useState } from 'react';

import { ChevronLeftIcon } from '@heroicons/react/outline';
import { SidebarToggleIcon } from '@/src/components/icons';

import PostSettings from '@/src/views/dashboard/PostSettings';

import { Status, TitleInput, WritingSpace } from './New.styled';
import { Flex, ActionsWrapper, LinkAction, IconAction } from '@/src/core-ui/actions';
import { Layout, Main, ContainerFluid, Header, Section, Container } from '@/src/views/dashboard/Layout';
import { Post } from '@/src/interfaces';
import { PostFormContext } from '@/src/contexts';
import { slugify } from '@/src/lib/helpers';

const W3Editor = dynamic(() => import('@/src/components/W3Editor'), { ssr: false });

const initialState: Post = {
  title: '',
  slug: '',
  slugEditedByUser: false,
  thumbnail: '',
  description: '',
  excerpt: '',
  content: '',
};

const NewPost: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [postForm, setPostForm] = useState(initialState);
  const value = useMemo(() => ({ postForm, setPostForm }), [postForm, setPostForm]);

  const updateTitle = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!postForm.slugEditedByUser) {
      setPostForm({ ...postForm, title: value, slug: slugify(value) });
    } else {
      setPostForm({ ...postForm, title: value });
    }
  };

  return (
    <PostFormContext.Provider value={value}>
      <Layout hasNavbar={false}>
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
                    <LinkAction variant="secondary">Draft</LinkAction>
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

          <pre>{JSON.stringify(postForm)}</pre>

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
      </Layout>
    </PostFormContext.Provider>
  );
};

export default NewPost;
