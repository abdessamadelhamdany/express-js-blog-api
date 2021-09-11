import { User } from '@/src/interfaces';
import { createContext, Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';

export interface IAuthContext {
  loggedInUser: User | null;
  setLoggedInUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<IAuthContext>({ loggedInUser: null, setLoggedInUser: () => {} });

interface Props {
  user: User | null;
}

export const AuthProvider: FC<Props> = ({ children, user }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(user);

  const memoedValue = useMemo(
    () => ({
      loggedInUser,
      setLoggedInUser,
    }),
    [loggedInUser]
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
