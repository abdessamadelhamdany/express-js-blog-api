import React from 'react';
import { Post } from '@/src/interfaces';

export const PostFormContext = React.createContext<{
  postForm: Post;
  setPostForm: (postForm: Post) => void;
}>({
  postForm: {
    title: '',
    slug: '',
    thumbnail: '',
    description: '',
    excerpt: '',
    content: '',
  },
  setPostForm: () => {},
});
