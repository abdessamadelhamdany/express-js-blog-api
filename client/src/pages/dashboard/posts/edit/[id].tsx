import { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import { DashboardLayout } from '@/src/layouts';
import { Post, MediaLibrary } from '@/src/interfaces';
import { MediaLibraryProvider, PostProvider } from '@/src/contexts';
import PostForm from '@/src/components/pages/dashboard/posts/PostForm';
import MediaLibraryModal from '@/src/components/pages/dashboard/posts/PostForm/MediaLibraryModal';

interface Props {
  originalPost: Post;
  mediaLibrary: MediaLibrary[];
}

export default function EditPost({ originalPost, mediaLibrary }: Props) {
  return (
    <MediaLibraryProvider>
      <PostProvider>
        <DashboardLayout hasNavbar={false}>
          <PostForm originalPost={originalPost} />
        </DashboardLayout>
      </PostProvider>

      <MediaLibraryModal mediaLibrary={mediaLibrary} />
    </MediaLibraryProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{ originalPost: Post; mediaLibrary: MediaLibrary[] }> =
  async function ({ req, query }) {
    let mediaLibrary: MediaLibrary[] = [];
    let originalPost: Post = { title: '', slug: '' };

    try {
      originalPost = await axios
        .get(`${process.env.APP_URL}/api/posts/${query.id}`)
        .then((res: AxiosResponse) => res.data.data.post);

      mediaLibrary = await axios
        .get(`${process.env.APP_URL}/api/media-library`, {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        })
        .then((res: AxiosResponse) => res.data.data.mediaLibrary);

      return {
        props: {
          mediaLibrary,
          originalPost,
        },
      };
    } catch (err: any) {
      console.error(err.response);
    }

    return {
      props: {
        mediaLibrary,
        originalPost,
      },
    };
  };
