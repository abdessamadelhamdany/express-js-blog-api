import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useValidationState } from '../hooks';
import { Post, PostStatus } from '@/src/interfaces';

export interface IPostContext {
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  saveDraft: () => void;
  savePublic: () => void;

  hasError: (key: string) => boolean;
  getError: (key: string) => string | undefined;
}

const initialPostState: Post = {
  title: '',
  slug: '',
  slugEditedByUser: false,
  thumbnail: '',
  description: '',
  excerpt: '',
  content: '',
};

const initialState: IPostContext = {
  post: initialPostState,
  setPost: () => {},
  saveDraft: () => {},
  savePublic: () => {},

  hasError: () => false,
  getError: () => '',
};

export const PostContext = React.createContext<IPostContext>(initialState);

export const PostProvider: FC = ({ children }) => {
  const router = useRouter();
  const [post, setPost] = useState<Post>(initialPostState);
  const [hasError, getError, setErrors] = useValidationState([]);

  const updateOrCreatePost = (status: PostStatus) => {
    const url = post.id ? `/api/posts/${post.id}` : '/api/posts';
    const method = post.id ? 'put' : 'post';
    const shouldRedirect = typeof post.id === 'undefined';

    axios[method](url, { ...post, status })
      .then((res: AxiosResponse) => {
        const post = res.data.data.post;

        setPost(post);

        if (shouldRedirect) {
          router.push(`/dashboard/posts/edit/${post.id}`);
        }
      })
      .catch((err: AxiosError) => {
        if (err.response && [400].includes(err.response.status) && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  const saveDraft = () => {
    updateOrCreatePost(PostStatus.DRAFT);
  };

  const savePublic = () => {
    updateOrCreatePost(PostStatus.PUBLIC);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoedValue = useMemo(() => ({ post, setPost, saveDraft, savePublic, hasError, getError }), [post]);

  return <PostContext.Provider value={memoedValue}>{children}</PostContext.Provider>;
};
