import axios, { AxiosError, AxiosResponse } from 'axios';
import { FormEvent, useState } from 'react';
import { DefaultLayout } from '@/src/layouts';
import { Container } from '@/src/core-ui/layouts';
import { Title } from '@/src/core-ui/typography';
import {
  Form,
  FormSection,
  FormRow,
  FormGroup,
  Label,
  Input,
  FormError,
  FormFooter,
  FormSubmit,
} from '@/src/core-ui/forms';
import { useValidationState } from '@/src/hooks';

export default function Register() {
  const [hasError, getError, setErrors] = useValidationState([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    axios
      .post('/api/login', data)
      .then((res: AxiosResponse) => {
        console.log('user loggedin', res.data);
      })
      .catch((err: AxiosError) => {
        if (err.response && [400, 404].includes(err.response.status) && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <DefaultLayout>
      <Container>
        <Form onSubmit={onSubmit} variant="middle">
          <Title>Login</Title>

          <FormSection>
            <FormRow>
              <FormGroup>
                <Label htmlFor="username">Email</Label>
                <Input invalid={hasError('username')} type="email" name="username" placeholder="Email" />
                <FormError invalid={hasError('username')}>{getError('username') || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input invalid={hasError('password')} type="password" name="password" placeholder="Password" />
                <FormError invalid={hasError('password')}>{getError('password') || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormFooter>
            <FormSubmit>Login</FormSubmit>
          </FormFooter>
        </Form>
      </Container>
    </DefaultLayout>
  );
}
