import { slugify } from '@/src/lib/helpers';
import { FC, ChangeEvent } from 'react';
import { usePostForm } from '@/src/hooks';
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
  const { postForm, setPostForm } = usePostForm();

  const onSlugChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPostForm({ ...postForm, slug: value === '-' ? value : slugify(value), slugEditedByUser: true });
  };

  const onSlugRefresh = () => {
    setPostForm({ ...postForm, slug: slugify(postForm.title), slugEditedByUser: false });
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
              <SlugInput type="text" placeholder="URL Slug" value={postForm.slug} onChange={onSlugChange} />

              <Toggler onClick={onSlugRefresh}>{<RefreshIcon />}</Toggler>
            </InputWrapper>

            <InputWrapper>
              <TextArea
                rows={3}
                value={postForm.excerpt}
                onChange={({ target: { value } }) => setPostForm({ ...postForm, excerpt: value })}
                placeholder="Excerpt"
              ></TextArea>
            </InputWrapper>

            <InputWrapper>
              <TextArea
                rows={3}
                value={postForm.description}
                onChange={({ target: { value } }) => setPostForm({ ...postForm, description: value })}
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
