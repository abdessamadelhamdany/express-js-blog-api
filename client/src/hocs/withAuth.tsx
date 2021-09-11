import axios from 'axios';
import { Redirect } from 'next';
import { FC, useEffect } from 'react';
import { User } from '@/src/interfaces';
import useAuth from '@/src/contexts/auth';

interface Props {
  user: User;
}

export const Protected: FC<Props> = ({ user, children }) => {
  const { setLoggedInUser, loggedInUser } = useAuth();

  useEffect(() => {
    setLoggedInUser(user);
  });

  return <>{loggedInUser && children}</>;
};

interface AuthProps {
  user: User | null;
  redirect?: Redirect;
}

export const initAuth = async (token: string): Promise<AuthProps> => {
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
};
