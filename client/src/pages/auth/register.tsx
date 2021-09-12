import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
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
import { DefaultLayout } from '@/src/layouts';
import { Title } from '@/src/core-ui/typography';
import { Container } from '@/src/core-ui/layouts';
import { useAuth, useValidationState } from '@/src/hooks';

export default function Register() {
  const router = useRouter();
  const { setAuthUser } = useAuth();
  const [hasError, getError, setErrors] = useValidationState([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));
    axios
      .post('/api/register', data)
      .then((res: AxiosResponse) => {
        setAuthUser(res.data.data.user);
        router.push('/dashboard');
      })
      .catch((err: AxiosError) => {
        if (err.response && [400].includes(err.response.status) && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <DefaultLayout>
      <Container>
        <Form onSubmit={onSubmit} variant="middle">
          <Title>Register</Title>

          <FormSection>
            <FormRow>
              <FormGroup>
                <Label htmlFor="firstName">First name</Label>
                <Input invalid={hasError('firstName')} type="text" name="firstName" placeholder="First name" />
                <FormError invalid={hasError('firstName')}>{getError('firstName') || 'no error, congrats!'}</FormError>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Last name</Label>
                <Input invalid={hasError('lastName')} type="text" name="lastName" placeholder="Last name" />
                <FormError invalid={hasError('lastName')}>{getError('lastName') || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input invalid={hasError('username')} type="text" name="username" placeholder="Username" />
                <FormError invalid={hasError('username')}>{getError('username') || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input invalid={hasError('email')} type="email" name="email" placeholder="Email" />
                <FormError invalid={hasError('email')}>{getError('email') || 'no error, congrats!'}</FormError>
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
            <FormSubmit>Register</FormSubmit>
          </FormFooter>
        </Form>
      </Container>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
