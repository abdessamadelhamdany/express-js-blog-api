import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';

export default function LogoutLink() {
  const router = useRouter();

  function logout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    axios
      .post('/api/logout')
      .then((_: AxiosResponse) => {
        router.push('/');
      })
      .catch((_: AxiosError) => {
        console.error('Sorry something went wrong!');
      });
  }

  return (
    <a href="#" onClick={logout}>
      Logout
    </a>
  );
}
