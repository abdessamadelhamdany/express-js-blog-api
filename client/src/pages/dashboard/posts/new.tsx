import { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import { DashboardLayout } from '@/src/layouts';
import { MediaLibrary } from '@/src/interfaces';
import { MediaLibraryProvider, PostProvider } from '@/src/contexts';
import PostForm from '@/src/components/pages/dashboard/posts/PostForm';
import MediaLibraryModal from '@/src/components/pages/dashboard/posts/PostForm/MediaLibraryModal';

export default function NewPost({ mediaLibrary }: { mediaLibrary: MediaLibrary[] }) {
  return (
    <MediaLibraryProvider>
      <PostProvider>
        <DashboardLayout hasNavbar={false}>
          <PostForm />
        </DashboardLayout>
      </PostProvider>

      <MediaLibraryModal mediaLibrary={mediaLibrary} />
    </MediaLibraryProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ req }) {
  let mediaLibrary: MediaLibrary[] = [];

  try {
    mediaLibrary = await axios
      .get(`${process.env.APP_URL}/api/media-library`, {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      })
      .then((res: AxiosResponse) => res.data.data.mediaLibrary);
    return {
      props: { mediaLibrary },
    };
  } catch (err: any) {
    console.error(err.response);
  }

  return {
    props: { mediaLibrary },
  };
};
