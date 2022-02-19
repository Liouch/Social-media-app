import { useState } from 'react';
import { RegisterUserMutationVariables } from '../generated/graphql';

type initialValues = RegisterUserMutationVariables;

export const useForm = (callback: () => void, initialState: initialValues) => {
  const [values, setValues] = useState<initialValues>(initialState);
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
