import { useState } from 'react';
import {
  LoginMutationVariables as Login,
  RegisterUserMutationVariables as Register,
} from '../generated/graphql';

type InitialValues = Register | Login;

export const useForm = (callback: () => void, initialState: InitialValues) => {
  const [values, setValues] = useState<InitialValues>(initialState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
