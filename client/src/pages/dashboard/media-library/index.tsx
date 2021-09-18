import { GetServerSideProps } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { DashboardLayout } from '@/src/layouts';
import { useValidationState } from '@/src/hooks';
import { MediaLibrary } from '@/src/interfaces/models/MediaLibrary';
import { Container, Header, Main, Section } from '@/src/core-ui/layouts';
import {
  FormError,
  Input,
  FormSection,
  FormRow,
  FormGroup,
  Label,
  Form,
  FormFooter,
  FormSubmit,
} from '@/src/core-ui/forms';
import { Title } from '@/src/core-ui/typography';
import MediaFiles from '@/src/components/pages/dashboard/media-library/MediaFiles';

export default function MediaLibraryHome() {
  const [hasError, getError, setErrors] = useValidationState([]);
  const [mediaLibrary, setMediaLibrary] = useState<MediaLibrary[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    axios
      .post('/api/media-library/upload', formData)
      .then((res: AxiosResponse) => {
        setMediaLibrary((mediaLibrary) => [res.data.data.mediaFile, ...mediaLibrary]);
      })
      .catch((err: AxiosError) => {
        if (err.response && [400].includes(err.response.status) && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  useEffect(() => {
    axios
      .get('/api/media-library')
      .then((res: AxiosResponse) => {
        setMediaLibrary(res.data.data.mediaLibrary);
      })
      .catch((err: AxiosError) => {
        console.error(err.response);
      });
  }, []);

  return (
    <DashboardLayout>
      <Main bgColor="gray.200">
        <Header>
          <Container>
            <Title marginless>Media Library</Title>
          </Container>
        </Header>

        <Section>
          <Container>
            <Form onSubmit={onSubmit} encType="multipart/form-data" variant="middle">
              <FormSection>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="photo">Upload photo</Label>
                    <Input invalid={hasError('photo')} type="file" name="photo" />
                    <FormError invalid={hasError('photo')}>{getError('photo') || 'no error, congrats!'}</FormError>
                  </FormGroup>
                </FormRow>
              </FormSection>

              <FormFooter>
                <FormSubmit>Upload</FormSubmit>
              </FormFooter>
            </Form>

            <MediaFiles mediaLibrary={mediaLibrary} />
          </Container>
        </Section>
      </Main>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
