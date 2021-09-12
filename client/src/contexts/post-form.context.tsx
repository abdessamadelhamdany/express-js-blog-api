import React, { Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';
import { Post } from '@/src/interfaces';

export interface IPostFormContext {
  postForm: Post;
  setPostForm: Dispatch<SetStateAction<Post>>;
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

export const PostFormContext = React.createContext<IPostFormContext>({
  postForm: initialState,
  setPostForm: () => {},
});

export const PostFormProvider: FC = ({ children }) => {
  const [postForm, setPostForm] = useState<Post>(initialState);

  const memoedValue = useMemo(() => ({ postForm, setPostForm }), [postForm]);

  return <PostFormContext.Provider value={memoedValue}>{children}</PostFormContext.Provider>;
};
