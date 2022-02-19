import React, { useState } from 'react';
import { ApolloError } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import { LoginMutationVariables, useLoginMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks';

type Error = ApolloError['graphQLErrors'][number]['extensions'];

function Login() {
  const [errors, setErrors] = useState<Error['errors']>({});
  let navigate = useNavigate();

  const initialState = {
    username: '',
    password: '',
  };

  const { onChange, onSubmit, values } = useForm(loginUser, initialState);

  const [loginUserMutation, { loading, error }] = useLoginMutation({
    variables: values as LoginMutationVariables,
    onCompleted: () => {
      navigate('/');
    },
    onError: (error: ApolloError) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  function loginUser() {
    loginUserMutation();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
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
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
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

export default Login;
