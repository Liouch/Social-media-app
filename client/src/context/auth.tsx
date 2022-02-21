import React, { createContext, useReducer } from 'react';
import { LoginMutation } from '../generated/graphql';

type AuthContextType = {
  user: LoginMutation['login'] | null;
  login: (arg: LoginMutation['login']) => void;
  logout: () => void;
};

type ActionType =
  | { type: 'LOGIN'; payload: LoginMutation['login'] }
  | { type: 'LOGOUT' };

type ItitialState = {
  user: LoginMutation['login'] | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state: ItitialState, action: ActionType) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (userData: LoginMutation['login']) => {
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
