import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { DashboardLayout } from '@/src/layouts';
import { Title } from '@/src/core-ui/typography';
import { MediaLibraryProvider } from '@/src/contexts';
import { MediaLibrary } from '@/src/interfaces/models/MediaLibrary';
import { Container, Header, Main, Section } from '@/src/core-ui/layouts';
import MediaFiles from '@/src/components/pages/dashboard/media-library/MediaFiles';
import UploadMediaForm from '@/src/components/pages/dashboard/media-library/UploadMediaForm';

export default function MediaLibraryHome({ mediaLibrary }: { mediaLibrary: MediaLibrary[] }) {
  return (
    <MediaLibraryProvider>
      <DashboardLayout>
        <Main bgColor="gray.200">
          <Header>
            <Container>
              <Title marginless>Media Library</Title>
            </Container>
          </Header>

          <Section>
            <Container>
              <UploadMediaForm />
              <MediaFiles mediaLibrary={mediaLibrary} />
            </Container>
          </Section>
        </Main>
      </DashboardLayout>
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
