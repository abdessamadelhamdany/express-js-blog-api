import styled from 'styled-components';
import {
  Form as BaseForm,
  FormError,
  FormSubmit as BaseFormSubmit,
  FormFooter as BaseFormFooter,
} from '@/src/core-ui/forms';

export const Form = styled(BaseForm)`
  display: flex;
  column-gap: 1.5rem;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.global.white};
`;

export const FormControls = styled.div`
  width: 30%;
  max-width: 20rem;
`;

export const FormLabel = styled.label<{ invalid?: boolean }>`
  display: flex;
  padding: 0.5rem;
  flex-grow: 1;
  flex-direction: column;
  border: 1px solid ${({ invalid, theme }) => (invalid ? theme.color.others.danger[500] : theme.color.gray[700])};

  &:hover {
    border-color: ${({ theme }) => theme.color.brand.primary};

    svg {
      stroke: ${({ invalid, theme }) => (invalid ? theme.color.others.danger[500] : theme.color.brand.primary)};
    }
  }

  svg {
    stroke: ${({ invalid, theme }) => (invalid ? theme.color.others.danger[500] : theme.color.gray[700])};
  }

  input {
    display: block;
    width: 0;
    height: 0;
  }

  ${FormError} {
    margin: 0 auto;
  }
`;

export const FormPreview = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 30rem;
`;

export const FormPlaceholder = styled.div`
  flex-grow: 1;
  display: flex;
  row-gap: 0.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  svg {
    height: 3rem;
  }
`;

export const FormCaption = styled.div`
  width: 100%;
`;

export const FormSubmit = styled(BaseFormSubmit)`
  width: 100%;
`;

export const FormAction = styled(BaseFormSubmit).attrs({ type: 'button' })`
  width: 100%;
`;

export const FormFooter = styled(BaseFormFooter)`
  row-gap: 1rem;
  display: flex;
  flex-direction: column;
`;
