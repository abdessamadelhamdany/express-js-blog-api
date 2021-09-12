import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuth } from '@/src/hooks';

export default function LogoutLink() {
  const { setAuthUser } = useAuth();
  const router = useRouter();

  function logout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    axios
      .post('/api/logout')
      .then((_: AxiosResponse) => {
        router.push('/');
        setAuthUser(null);
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
