import React from 'react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { FormError, Input, FormRow, FormGroup } from '@/src/core-ui/forms';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';
import {
  Form,
  FormCaption,
  FormSubmit,
  FormControls,
  FormLabel,
  FormPlaceholder,
  FormPreview,
  FormAction,
  FormFooter,
} from './UploadMediaForm.styled';
import ResponsiveImage from '@/src/components/common/ResponsiveImage';
import { resizeImage } from '@/src/lib/media-library';

export default function UploadMediaFormComponent() {
  const { mediaFile, setMediaFile, mediaUploader, resetErrors, hasError, getError } = useMediaLibrary();

  const optimizeImage = async () => {
    resetErrors();

    const resizedImage = await resizeImage('https://images.pexels.com/photos/1224789/pexels-photo-1224789.jpeg', {
      width: mediaFile.width || 'auto',
    });

    setMediaFile((mediaFile) => ({ ...mediaFile, path: resizedImage.src }));
  };

  return (
    <>
      <Form onSubmit={mediaUploader} encType="multipart/form-data">
        <FormControls>
          <FormRow>
            <FormGroup>
              <Input invalid={hasError('alt')} type="text" name="alt" placeholder="Alt" />
              <FormError invalid={hasError('alt')}>{getError('alt') || 'no error, congrats!'}</FormError>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Input invalid={hasError('caption')} type="text" name="caption" placeholder="Caption" />
              <FormError invalid={hasError('caption')}>{getError('caption') || 'no error, congrats!'}</FormError>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Input
                invalid={hasError('width')}
                type="text"
                placeholder="Width"
                value={mediaFile.width}
                onChange={({ target: { value } }) => {
                  const width = Number(value);
                  console.log('value', value);

                  if (isNaN(width)) {
                    return;
                  }

                  setMediaFile((mediaFile) => ({ ...mediaFile, width: Number(value) }));
                }}
              />
              <FormError invalid={hasError('width')}>{getError('width') || 'no error, congrats!'}</FormError>
            </FormGroup>
          </FormRow>

          <FormFooter>
            <FormAction type="button" onClick={optimizeImage}>
              Optimize
            </FormAction>
            <FormSubmit>Upload</FormSubmit>
          </FormFooter>
        </FormControls>

        <FormLabel invalid={hasError('photo')}>
          {mediaFile.path ? (
            <FormPreview>
              {mediaFile.path && <ResponsiveImage src={mediaFile.path} alt={mediaFile.alt} />}

              {mediaFile.caption && <FormCaption>{mediaFile.caption}</FormCaption>}
            </FormPreview>
          ) : (
            <FormPlaceholder>
              <CloudUploadIcon />
              <span>Choose a media file</span>
            </FormPlaceholder>
          )}

          <FormError invalid={hasError('photo')}>{getError('photo') || 'no error, congrats!'}</FormError>
          <input type="file" name="photo" />
        </FormLabel>
      </Form>

      <br />
      {/* <Form onSubmit={mediaUploader} encType="multipart/form-data" variant="middle">
        <div>Controls (caption, alt, rotation, resize)</div>
        <div>Preview, (defaul image)</div>
        <footer>confirm and upload</footer>

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
      </Form> */}
    </>
  );
}
