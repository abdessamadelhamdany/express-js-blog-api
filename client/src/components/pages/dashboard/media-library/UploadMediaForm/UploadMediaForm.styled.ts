import styled from 'styled-components';
import {
  Form as BaseForm,
  FormError,
  FormSubmit as BaseFormSubmit,
  FormFooter as BaseFormFooter,
} from '@/src/core-ui/forms';
import { screens, size } from '@/src/styles/screens';

export const Form = styled(BaseForm)`
  width: 100%;
  display: flex;
  margin: 0 auto;
  column-gap: 1.5rem;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.global.white};

  @media ${screens.laptop} {
    max-width: ${size.laptop};
  }
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
  border: 1px solid ${({ invalid, theme }) => (invalid ? theme.color.others.danger[300] : theme.color.gray[500])};

  &,
  span,
  svg {
    transition: all 150ms;
  }

  span {
    color: ${({ invalid, theme }) => (invalid ? theme.color.others.danger[300] : theme.color.gray[500])};
  }

  svg {
    stroke: ${({ invalid, theme }) => (invalid ? theme.color.others.danger[300] : theme.color.gray[500])};
  }

  &:hover {
    border-color: ${({ invalid, theme }) => (invalid ? theme.color.others.danger[500] : theme.color.gray[900])};

    span {
      color: ${({ invalid, theme }) => (invalid ? theme.color.others.danger[500] : theme.color.gray[900])};
    }

    svg {
      stroke: ${({ invalid, theme }) => (invalid ? theme.color.others.danger[500] : theme.color.gray[900])};
    }
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
  gap: 1rem;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  max-width: 30rem;
  align-items: center;
  justify-content: flex-start;
  max-height: 24rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const FormPreviewHint = styled.div`
  display: flex;
  position: relative;

  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    margin: 5px;
    padding: 5px;
    opacity: 0.5;
    background: ${({ theme }) => theme.color.global.white};
    transition: opacity 150ms;
    z-index: 3;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;

export const FormPlaceholder = styled.div`
  flex-grow: 1;
  padding: 4rem 0;
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
