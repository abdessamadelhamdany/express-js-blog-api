import axios from 'axios';
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

interface Props {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export default function Register() {
  const [errors, setErrors] = useState<Props>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    axios
      .post('/api/register', data)
      .then((response) => {
        console.log(response);
      })
      .catch((err: any) => {
        console.error(err);
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
                <Input invalid={!!errors.firstName} type="text" name="firstName" placeholder="First name" />
                <FormError invalid={!!errors.firstName}>{errors.firstName || 'no error, congrats!'}</FormError>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Last name</Label>
                <Input invalid={!!errors.lastName} type="text" name="lastName" placeholder="Last name" />
                <FormError invalid={!!errors.lastName}>{errors.lastName || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input invalid={!!errors.username} type="text" name="username" placeholder="Username" />
                <FormError invalid={!!errors.username}>{errors.username || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input invalid={!!errors.email} type="email" name="email" placeholder="Email" />
                <FormError invalid={!!errors.email}>{errors.email || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input invalid={!!errors.password} type="password" name="password" placeholder="Password" />
                <FormError invalid={!!errors.password}>{errors.password || 'no error, congrats!'}</FormError>
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
