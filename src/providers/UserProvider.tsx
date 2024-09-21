import { User } from '../types/User';
import { ReactNode, createContext, useReducer } from 'react';

type Action = { type: 'logIn'; user: User } | { type: 'logOut' };
type Dispatch = (action: Action) => void;
type State = { user: User | null };
type UserProviderProps = { children: ReactNode };

const UserContext = createContext<
  { userState: State; userDispatch: Dispatch } | undefined
>(undefined);

function userReducer(_state: State, action: Action) {
  switch (action.type) {
    case 'logIn': {
      return { user: action.user };
    }
    case 'logOut': {
      return { user: null };
    }
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [userState, userDispatch] = useReducer(userReducer, { user: null });
  const value = { userState, userDispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
