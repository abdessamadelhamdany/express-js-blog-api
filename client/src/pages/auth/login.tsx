import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { FormEvent } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { DefaultLayout } from '@/src/layouts';
import { Title } from '@/src/core-ui/typography';
import { Container } from '@/src/core-ui/layouts';
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
import { useAuth, useValidationState } from '@/src/hooks';

export default function Register() {
  const router = useRouter();
  const { setAuthUser } = useAuth();
  const [hasError, getError, setErrors] = useValidationState([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors([]);

    const data = Object.fromEntries(new FormData(event.currentTarget));
    axios
      .post('/api/login', data)
      .then(async (res: AxiosResponse) => {
        setAuthUser(res.data.data.user);
        await router.push('/dashboard');
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

export const getServerSideProps: GetServerSideProps = async () => {
  // if (context.req.cookies.token) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
