import { useReducer, createContext } from 'react';
import { User, UserRole } from '@/src/interfaces';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  role: UserRole.GUEST,
};

export const PostFormContext = createContext<{
  value: User;
  setValue: (value: User) => void;
}>({
  value: initialState,
  setValue: () => {},
});
