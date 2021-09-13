import React, { Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';
import { Post, PostStatus } from '@/src/interfaces';

export interface IPostContext {
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
}

const initialState: Post = {
  title: '',
  slug: '',
  slugEditedByUser: false,
  thumbnail: '',
  description: '',
  excerpt: '',
  content: '',
};

export const PostContext = React.createContext<IPostContext>({
  post: initialState,
  setPost: () => {},
});

export const PostProvider: FC = ({ children }) => {
  const [post, setPost] = useState<Post>(initialState);

  const memoedValue = useMemo(() => ({ post, setPost }), [post]);

  return <PostContext.Provider value={memoedValue}>{children}</PostContext.Provider>;
};
