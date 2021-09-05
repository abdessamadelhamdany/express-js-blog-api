import React from 'react';
import { Post } from 'server/blog/posts/models/Post';

export const PostFormContext = React.createContext<{
  postForm: Post;
  setPostForm: (postForm: Post) => void;
}>(null);
