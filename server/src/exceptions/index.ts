import { ValidationError } from 'class-validator';

class BaseError {
  public message: string;

  constructor() {
    Error.apply(this, arguments);
  }
}
BaseError.prototype = new Error();

export class ResourceValidationError extends BaseError {
  public errors: ValidationError[] = [];

  constructor(resource: string, errors: ValidationError[]) {
    super();
    this.message = `Resource ${resource} is invalid.`;
    this.errors = errors;
  }
}

export class ResourceNotFoundError extends BaseError {
  public errors: ValidationError[] = [];

  constructor(resource: string, errors: ValidationError[] = []) {
    super();
    this.message = `Resource ${resource} was not found.`;
    this.errors = errors;
  }
}

export class InvalidTokenError extends BaseError {
  constructor() {
    super();
    this.message = `Invalid token.`;
  }
}
