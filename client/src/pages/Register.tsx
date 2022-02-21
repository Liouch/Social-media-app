import { ApolloError } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {
  RegisterUserMutationVariables,
  useRegisterUserMutation,
} from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

type Error = ApolloError['graphQLErrors'][number]['extensions'];

function Register() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<Error['errors']>({});
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialValues);
  let navigate = useNavigate();

  const [registerUserMutation, { loading, error }] = useRegisterUserMutation({
    variables: values as RegisterUserMutationVariables,
    onCompleted: (data) => {
      context.login(data.register);
      navigate('/');
    },
    onError: (error: ApolloError) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  function registerUser() {
    registerUserMutation();
  }
  if ('email' in values) {
    return (
      <div className='form-container'>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? 'loading' : ''}
        >
          <h1>Register</h1>
          <Form.Input
            label='Username'
            placeholder='Username...'
            name='username'
            type='text'
            value={values.username}
            error={!!errors.username}
            onChange={onChange}
          />
          <Form.Input
            label='Email'
            placeholder='Email...'
            name='email'
            type='email'
            value={values.email}
            error={!!errors.email}
            onChange={onChange}
          />
          <Form.Input
            label='Password'
            placeholder='Password...'
            name='password'
            type='password'
            value={values.password}
            error={!!errors.password}
            onChange={onChange}
          />
          <Form.Input
            label='Confirm password'
            placeholder='Confirm password...'
            name='confirmPassword'
            type='password'
            value={values.confirmPassword}
            onChange={onChange}
          />
          <Button type='submit' primary>
            Register
          </Button>
        </Form>
        {typeof error === 'object' && Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((value) => (
                <li key={value as string}>{value as string}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default Register;
