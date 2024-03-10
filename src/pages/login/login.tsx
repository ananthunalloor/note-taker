import { useCallback } from 'react';

import { TextInput, Flex, Button, Group, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { BaseAuth, Error } from '../../types';
import { authenticateUser } from '../../service';
import { notifications } from '@mantine/notifications';

export const Login = () => {
  const navigate = useNavigate();

  const { getInputProps, onSubmit } = useForm<BaseAuth>({
    initialValues: {
      username: '',
      password: ''
    },

    validate: {
      username: (value) => (value.length <= 3 ? 'Username is too short' : null),
      password: (value) => (value.length >= 8 ? null : 'Password is too short')
    }
  });

  const onSubmitHandler = useCallback(
    async (values: BaseAuth) => {
      await authenticateUser(values)
        .then(() => {
          navigate('/');
          notifications.show({
            title: 'Login Successful',
            message: 'You have successfully logged in',
            color: 'teal',
            icon: null,
            autoClose: 3000
          });
        })
        .catch((error: Error) => {
          notifications.show({
            title: 'Login Failed',
            message: error.message,
            color: 'red',
            icon: null,
            autoClose: 3000
          });
        });
    },
    [authenticateUser]
  );

  return (
    <Flex
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <form onSubmit={onSubmit(onSubmitHandler)}>
        <Flex
          direction='column'
          style={{
            width: 340,
            gap: 12
          }}
        >
          <TextInput
            withAsterisk
            label='Username'
            type='username'
            placeholder='username'
            {...getInputProps('username')}
          />
          <PasswordInput
            withAsterisk
            label='Password'
            type='password'
            placeholder='password'
            {...getInputProps('password')}
          />

          <Group
            style={{
              justifyContent: 'flex-end'
            }}
          >
            <Button type='submit'>Login</Button>
          </Group>
        </Flex>
      </form>
    </Flex>
  );
};
