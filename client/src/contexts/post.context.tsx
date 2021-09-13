import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useValidationState } from '../hooks';
import { Post, PostStatus } from '@/src/interfaces';

export interface IPostContext {
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  saveDraft: () => void;
  savePublic: () => void;
  remove: (id: number) => void;
  softRemove: (id: number) => void;
  recover: (id: number) => void;

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
  posts: [],
  setPosts: () => {},
  saveDraft: () => {},
  savePublic: () => {},
  remove: () => {},
  softRemove: () => {},
  recover: () => {},

  hasError: () => false,
  getError: () => '',
};

export const PostContext = React.createContext<IPostContext>(initialState);

export const PostProvider: FC = ({ children }) => {
  const router = useRouter();
  const [post, setPost] = useState<Post>(initialPostState);
  const [posts, setPosts] = useState<Post[]>([]);
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

  const deletePost = async (id: number, softDelete: boolean = true): Promise<void> => {
    const url = softDelete ? `/api/posts/${id}/soft-delete` : `/api/posts/${id}`;

    try {
      await axios.delete(url);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const remove = async (id: number): Promise<void> => {
    if (confirm('Are you sure❓\n⚠️ You cannot revert this action')) {
      await deletePost(id, false);
      setPosts((posts) => posts.filter((post) => post.id !== id));
    }
  };

  const softRemove = async (id: number): Promise<void> => {
    if (confirm('Are you sure❓')) {
      await deletePost(id, true);
      setPosts((posts) => posts.filter((post) => post.id !== id));
    }
  };

  const recover = async (id: number): Promise<void> => {
    if (confirm('Are you sure❓')) {
      try {
        const { data } = await axios.post(`/api/posts/${id}/recover`);
        const recoveredPost: Post = data.data.post;
        setPosts((posts) => posts.filter((post) => post.id !== recoveredPost.id));
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  const memoedValue = useMemo(
    () => {
      return { post, setPost, posts, setPosts, saveDraft, savePublic, remove, softRemove, recover, hasError, getError };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [post, posts]
  );

  return <PostContext.Provider value={memoedValue}>{children}</PostContext.Provider>;
};
