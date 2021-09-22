import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { FormError, Input, FormRow, FormGroup } from '@/src/core-ui/forms';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';
import {
  Form,
  FormSubmit,
  FormControls,
  FormLabel,
  FormPlaceholder,
  FormPreview,
  FormAction,
  FormFooter,
  FormPreviewHint,
} from './UploadMediaForm.styled';
import { loadImage } from '@/src/lib/helpers';
import { ResizedImage, resizeImage } from '@/src/lib/media-library';

export default function UploadMediaFormComponent() {
  const [widths, setWidth] = useState('460,700');
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const [originalImage, setOriginalImage] = useState<ResizedImage | undefined>();
  const { uploadForm, setUploadForm, mediaUploader, setErrors, hasError, getError } = useMediaLibrary();

  const clearState = () => {
    setErrors([]);
    setUploadForm((uF) => ({ ...uF, images: [] }));
    setOriginalImage(undefined);
    if (imageFileInputRef.current) {
      imageFileInputRef.current.type = 'text';
      imageFileInputRef.current.type = 'file';
    }
  };

  const optimizeImage = async () => {
    setErrors([]);

    if (!originalImage) {
      setErrors([
        {
          property: 'photo',
          constraints: {
            isNotEmpty: 'Photo should not be empty',
          },
        },
      ]);
      return;
    }

    console.log(originalImage);

    const resizedImages = await resizeImage(originalImage.src, {
      widths: widths
        .split(',')
        .filter((w) => w.length > 0)
        .map((w) => parseInt(w)),
    });

    setUploadForm((uF) => ({ ...uF, images: resizedImages }));
  };

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      e.target.type = 'text';
      e.target.type = 'file';

      setOriginalImage(undefined);

      setErrors([
        {
          property: 'photo',
          constraints: {
            isInvalidFileType: 'Photo must be an image.',
          },
        },
      ]);
      return;
    }

    const image = await loadImage(file);
    setOriginalImage(image);

    setErrors([]);
  };

  return (
    <>
      <Form onSubmit={mediaUploader} encType="multipart/form-data">
        {originalImage && (
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
                  invalid={hasError('widths')}
                  type="text"
                  placeholder="Supported widths"
                  value={widths}
                  onChange={(e) => {
                    let value = e.target.value;
                    const backward = value.length < widths.length;
                    const key = backward ? '' : value.replace(widths, '');
                    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '', ','];

                    if (!allowedKeys.includes(key)) {
                      return;
                    }

                    if (backward && value.endsWith(',')) {
                      value = value.substr(0, value.length - 1);
                    }

                    setWidth(value);
                  }}
                />
                <FormError invalid={hasError('widths')}>{getError('widths') || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormFooter>
              <FormAction type="button" onClick={clearState}>
                Clear
              </FormAction>
              <FormAction type="button" onClick={optimizeImage}>
                Optimize
              </FormAction>
              <FormSubmit>Save</FormSubmit>
            </FormFooter>
          </FormControls>
        )}

        {uploadForm.images.length ? (
          <FormPreview>
            {uploadForm.images.map((image, idx) => (
              <FormPreviewHint data-text={`${image.width}px`} key={idx}>
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={uploadForm.alt}
                  title={uploadForm.caption}
                  objectFit="cover"
                />
              </FormPreviewHint>
            ))}
          </FormPreview>
        ) : originalImage ? (
          <FormPreview>
            <Image
              src={originalImage.src}
              width={originalImage.width}
              height={originalImage.height}
              alt={uploadForm.alt}
              title={uploadForm.caption}
              objectFit="cover"
            />
          </FormPreview>
        ) : (
          <FormLabel invalid={hasError('photo')}>
            <FormPlaceholder>
              <CloudUploadIcon />
              <span>Choose a media file</span>
            </FormPlaceholder>
            <FormError invalid={hasError('photo')}>{getError('photo') || 'no error, congrats!'}</FormError>
            <input ref={imageFileInputRef} type="file" name="photo" accept="image/*" onChange={onImageChange} />
          </FormLabel>
        )}
      </Form>

      <br />
      {/* <Form onSubmit={mediaUploader} encType="multipart/form-data" variant="middle">
        <div>Controls (caption, alt, rotation, resize)</div>
        <div>Preview, (default image)</div>
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
