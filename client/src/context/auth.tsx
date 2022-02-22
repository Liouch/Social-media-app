import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { createContext, useReducer } from 'react';
import { LoginMutation } from '../generated/graphql';

type InitialState = {
  user: LoginMutation['login'] | JwtPayload | null;
};

interface AuthContextType extends InitialState {
  login: (arg: LoginMutation['login']) => void;
  logout: () => void;
}

type ActionType =
  | { type: 'LOGIN'; payload: LoginMutation['login'] }
  | { type: 'LOGOUT' };

const initialState: InitialState = {
  user: null,
};
const token = localStorage.getItem('jwtToken');
if (token) {
  // check if the token has been expired
  const decodedToken = jwtDecode<JwtPayload>(token);
  if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state: InitialState, action: ActionType) => {
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
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: LoginMutation['login']) => {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
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
