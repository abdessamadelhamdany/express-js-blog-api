export interface ValidationError {
  property: string;
  constraints?: {
    [type: string]: string;
  };

  /**
   * Contains all nested validation errors of the property.
   */
  children?: ValidationError[];
  contexts?: {
    [type: string]: any;
  };
}
