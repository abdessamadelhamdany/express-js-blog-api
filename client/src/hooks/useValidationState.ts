import { useState, Dispatch, SetStateAction } from 'react';
import { ValidationError } from '@/src/interfaces';

type ValidationState = [
  (key: string) => boolean,
  (key: string) => string | undefined,
  Dispatch<SetStateAction<ValidationError[]>>
];

export const useValidationState = (initialState: ValidationError[] = []): ValidationState => {
  const [errors, setErrors] = useState<ValidationError[]>(initialState);

  function hasError(key: string): boolean {
    return errors.findIndex((error) => error.property === key) !== -1;
  }

  function getError(key: string): string | undefined {
    const error = errors.find((error) => error.property === key);

    if (!error || !error.constraints) {
      return;
    }

    const constraints = Object.keys(error.constraints);

    if (constraints.length === 0) {
      return;
    }

    const property = error.property.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();

    let message = error.constraints[Object.keys(error.constraints)[0]];
    message = message.replace(error.property, property);
    message = message.charAt(0).toUpperCase() + message.slice(1);

    return message;
  }

  return [hasError, getError, setErrors];
};
