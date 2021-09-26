import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { FormError, Input, FormRow, FormGroup, FormSection, Label } from '@/src/core-ui/forms';
import {
  Form,
  FormSubmit,
  FormControls,
  FormLabel,
  FormPlaceholder,
  FormPreview,
  FormFooter,
  FormPreviewHint,
  FormAction,
  FormContainer,
} from './UploadMediaForm.styled';
import { readableFileSize } from '@/src/lib/helpers';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';
import { PreviewImage, useImageProcessing } from '@/src/hooks/useImageProcessing';

interface Props {
  onMediaUploaded?: () => void;
}

export default function UploadMediaFormComponent({ onMediaUploaded }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const { blobToImageElement, validateImage, processImage } = useImageProcessing();
  const { setErrors, hasError, getError, uploadForm, setUploadForm, submitUploadForm } = useMediaLibrary();

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // Make sure file is not empty
    if (!e.target.files?.length) {
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

    // Make sure file is a valid image
    const file = e.target.files[0];
    if (!validateImage(file)) {
      e.target.type = 'text';
      e.target.type = 'file';

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

    // Processing image
    const processedImages = await processImage(file);
    setUploadForm((uF) => ({ ...uF, filename: file.name, processedImages }));

    // Set preview images
    const prevImages: PreviewImage[] = [];
    for (const processedImage of processedImages) {
      const prevImage = await blobToImageElement(processedImage);
      prevImages.push(prevImage);
    }

    setPreviewImages(prevImages);
  };

  const clearForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.type = 'text';
      fileInputRef.current.type = 'file';
    }

    setPreviewImages([]);
    setUploadForm((uF) => ({ ...uF, processedImages: [] }));
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submitUploadForm();
      clearForm();
      onMediaUploaded && onMediaUploaded();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Form onSubmit={onFormSubmit} encType="multipart/form-data">
        <FormContainer>
          <FormControls>
            <FormRow>
              <FormGroup>
                <Input
                  invalid={hasError('alt')}
                  type="text"
                  value={uploadForm.alt}
                  placeholder="Alt"
                  onChange={(e) => setUploadForm((uF) => ({ ...uF, alt: e.target.value }))}
                />
                <FormError invalid={hasError('alt')}>{getError('alt') || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Input
                  invalid={hasError('caption')}
                  type="text"
                  value={uploadForm.caption}
                  placeholder="Caption"
                  onChange={(e) => setUploadForm((uF) => ({ ...uF, caption: e.target.value }))}
                />
                <FormError invalid={hasError('caption')}>{getError('caption') || 'no error, congrats!'}</FormError>
              </FormGroup>
            </FormRow>

            <FormFooter>
              <FormAction type="button" onClick={clearForm}>
                Clear
              </FormAction>
              <FormSubmit>Upload</FormSubmit>
            </FormFooter>
          </FormControls>

          {previewImages.length > 0 ? (
            <FormPreview>
              {previewImages.map((previewImage, idx) => (
                <FormPreviewHint data-text={`${previewImage.width}px/${readableFileSize(previewImage.size)}`} key={idx}>
                  <Image
                    src={previewImage.src}
                    width={previewImage.width}
                    height={previewImage.height}
                    alt={uploadForm.alt}
                    title={uploadForm.caption}
                    objectFit="cover"
                  />
                </FormPreviewHint>
              ))}
            </FormPreview>
          ) : (
            <FormLabel invalid={hasError('photo')}>
              <FormPlaceholder>
                <CloudUploadIcon />
                <span>Choose a media file</span>
              </FormPlaceholder>
              <FormError invalid={hasError('photo')}>{getError('photo') || 'no error, congrats!'}</FormError>
              <input ref={fileInputRef} type="file" name="photo" accept="image/*" onChange={onImageChange} />
            </FormLabel>
          )}
        </FormContainer>
      </Form>
    </>
  );
}
