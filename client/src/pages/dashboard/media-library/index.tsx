import { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import { DashboardLayout } from '@/src/layouts';
import { Title } from '@/src/core-ui/typography';
import { MediaLibraryProvider } from '@/src/contexts';
import { MediaLibrary } from '@/src/interfaces/models/MediaLibrary';
import { Container, Header, Main, Section } from '@/src/core-ui/layouts';
import { MediaFiles, UploadMediaForm } from '@/src/components/pages/dashboard/media-library';
import { useState } from 'react';
import {
  MediaLibraryModalTabs,
  MediaLibraryModalTab,
} from '@/src/components/pages/dashboard/posts/PostForm/MediaLibraryModal/MediaLibraryModal.styled';

export default function MediaLibraryHome({ mediaLibrary }: { mediaLibrary: MediaLibrary[] }) {
  const [activeTab, setActiveTab] = useState<'media-files' | 'upload-file'>('media-files');

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
              <MediaLibraryModalTabs>
                <MediaLibraryModalTab
                  className={activeTab === 'media-files' ? 'active' : ''}
                  onClick={() => setActiveTab('media-files')}
                >
                  Media Files
                </MediaLibraryModalTab>
                <MediaLibraryModalTab
                  className={activeTab === 'upload-file' ? 'active' : ''}
                  onClick={() => setActiveTab('upload-file')}
                >
                  Upload New
                </MediaLibraryModalTab>
              </MediaLibraryModalTabs>

              {activeTab === 'upload-file' && <UploadMediaForm mediaUploaded={() => setActiveTab('media-files')} />}

              {activeTab === 'media-files' && <MediaFiles mediaLibrary={mediaLibrary} />}
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
