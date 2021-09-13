import { slugify } from '@/src/lib/helpers';
import { FC, ChangeEvent } from 'react';
import { usePost } from '@/src/hooks';
import { TextArea } from '@/src/styles/common/TextArea';
import { RefreshIcon } from '@heroicons/react/outline';
import { Header, Section } from '@/src/core-ui/layouts';
import { IconAction, Flex } from '@/src/core-ui/actions';
import { SidebarToggleIcon } from '@/src/components/icons';
import { Wrapper, Title, InputWrapper, SlugInput, Toggler } from './PostSettings.styled';

interface Props {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PostSettings: FC<Props> = ({ isOpen = false, setIsOpen }) => {
  const { post, setPost } = usePost();

  const onSlugChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPost((post) => ({ ...post, slug: value.endsWith('-') ? value : slugify(value), slugEditedByUser: true }));
  };

  const onSlugRefresh = () => {
    setPost((post) => ({ ...post, slug: slugify(post.title), slugEditedByUser: false }));
  };

  return (
    <>
      {isOpen && (
        <Wrapper>
          <Header>
            <Flex items="center" justify="space-between">
              <Title>Post settings</Title>
              <IconAction variant="secondary" isActive={isOpen} onClick={() => setIsOpen(false)}>
                <SidebarToggleIcon />
              </IconAction>
            </Flex>
          </Header>
          <Section>
            <InputWrapper className="has-toggler">
              <SlugInput type="text" placeholder="URL Slug" value={post.slug} onChange={onSlugChange} />

              <Toggler onClick={onSlugRefresh}>{<RefreshIcon />}</Toggler>
            </InputWrapper>

            <InputWrapper>
              <TextArea
                rows={3}
                value={post.excerpt}
                onChange={({ target: { value } }) => setPost((post) => ({ ...post, excerpt: value }))}
                placeholder="Excerpt"
              ></TextArea>
            </InputWrapper>

            <InputWrapper>
              <TextArea
                rows={3}
                value={post.description}
                onChange={({ target: { value } }) => setPost((post) => ({ ...post, description: value }))}
                placeholder="Description"
              ></TextArea>
            </InputWrapper>
          </Section>
        </Wrapper>
      )}
    </>
  );
};

export default PostSettings;
