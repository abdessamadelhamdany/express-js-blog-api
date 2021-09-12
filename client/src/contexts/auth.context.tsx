import { createContext, Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';
import { User } from '@/src/interfaces';

export interface IAuthContext {
  authUser: User | null;
  setAuthUser: Dispatch<SetStateAction<User | null>>;
}

const initialState: IAuthContext = {
  authUser: null,
  setAuthUser: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

interface Props {
  user: User | null;
}

export const AuthProvider: FC<Props> = ({ children, user }) => {
  const [authUser, setAuthUser] = useState<User | null>(user);

  const memoedValue = useMemo(
    () => ({
      authUser,
      setAuthUser,
    }),
    [authUser]
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};
