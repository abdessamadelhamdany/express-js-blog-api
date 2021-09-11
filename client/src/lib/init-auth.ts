import axios from 'axios';
import { Redirect } from 'next';
import { User } from '@/src/interfaces';

interface AuthProps {
  user: User | null;
  redirect?: Redirect;
}

export async function initAuth(token: string): Promise<AuthProps> {
  const redirect: Redirect = {
    destination: '/auth/login',
    permanent: false,
  };

  if (!token) return { user: null, redirect };

  try {
    const { data } = await axios.get(`${process.env.APP_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { user: data.data.user };
  } catch (error: any) {
    console.error(error.message);

    return { user: null, redirect };
  }
}
