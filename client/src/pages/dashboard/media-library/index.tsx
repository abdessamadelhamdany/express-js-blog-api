import { GetServerSideProps } from 'next';
import { Main } from '@/src/core-ui/layouts';
import { DashboardLayout } from '@/src/layouts';
import { FormEvent } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

export default function MediaLibrary() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    axios
      .post('/api/media-library/upload', formData)
      .then((res: AxiosResponse) => {
        console.log(res.data.data);
        //
      })
      .catch((err: AxiosError) => {
        console.error(err.response);
      });
  };

  return (
    <DashboardLayout>
      <Main>
        <h2>Media library</h2>
        <form encType="multipart/form-data" onSubmit={onSubmit}>
          <input name="photo" type="file" />
          <button type="submit">Upload</button>
        </form>
      </Main>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
