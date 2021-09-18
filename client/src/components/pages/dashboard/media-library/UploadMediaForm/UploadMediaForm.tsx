import React, { FormEvent } from 'react';
import {
  FormError,
  Input,
  FormSection,
  FormRow,
  FormGroup,
  Label,
  Form,
  FormFooter,
  FormSubmit,
} from '@/src/core-ui/forms';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';

export default function UploadMediaForm() {
  const { mediaUploader, hasError, getError } = useMediaLibrary();

  return (
    <Form onSubmit={mediaUploader} encType="multipart/form-data" variant="middle">
      <FormSection>
        <FormRow>
          <FormGroup>
            <Label htmlFor="photo">Upload photo</Label>
            <Input invalid={hasError('photo')} type="file" name="photo" />
            <FormError invalid={hasError('photo')}>{getError('photo') || 'no error, congrats!'}</FormError>
          </FormGroup>
        </FormRow>
      </FormSection>

      <FormFooter>
        <FormSubmit>Upload</FormSubmit>
      </FormFooter>
    </Form>
  );
}
