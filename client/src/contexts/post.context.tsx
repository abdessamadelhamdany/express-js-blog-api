import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useValidationState } from '../hooks';
import { Post, PostStatus } from '@/src/interfaces';

export interface IPostContext {
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  saveDraft: () => void;

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

  hasError: () => false,
  getError: () => '',
};

export const PostContext = React.createContext<IPostContext>(initialState);

export const PostProvider: FC = ({ children }) => {
  const [post, setPost] = useState<Post>(initialPostState);
  const [hasError, getError, setErrors] = useValidationState([]);

  const saveDraft = () => {
    axios
      .post('/api/posts', { ...post, status: PostStatus.DRAFT })
      .then((res: AxiosResponse) => {
        console.log('post created successfuly');
      })
      .catch((err: AxiosError) => {
        if (err.response && [400].includes(err.response.status) && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoedValue = useMemo(() => ({ post, setPost, saveDraft, hasError, getError }), [post]);

  return <PostContext.Provider value={memoedValue}>{children}</PostContext.Provider>;
};
