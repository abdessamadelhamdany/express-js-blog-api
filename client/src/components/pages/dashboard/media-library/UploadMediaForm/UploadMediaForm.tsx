import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';
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
} from './UploadMediaForm.styled';
import { PreviewImage, useImageProcessing } from '@/src/hooks/useImageProcessing';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';
import { readableFileSize } from '@/src/lib/helpers';

export default function UploadMediaFormComponent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { blobToImageElement, validateImage, processImage } = useImageProcessing();
  const { setErrors, hasError, getError, uploadForm, setUploadForm } = useMediaLibrary();
  const [processedImages, setProcessedImages] = useState<Blob[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  const mediaUploader = () => {
    console.log(processedImages);
  };

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
    const procImages = await processImage(file);
    setProcessedImages(procImages);

    // Set preview images
    const prevImages: PreviewImage[] = [];
    for (const procImage of procImages) {
      const prevImage = await blobToImageElement(procImage);
      prevImages.push(prevImage);
    }

    console.log('prevImages', prevImages);

    setPreviewImages(prevImages);
  };

  return (
    <>
      <Form onSubmit={mediaUploader} encType="multipart/form-data">
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
            <FormAction
              type="button"
              onClick={(e) => {
                if (fileInputRef.current) {
                  fileInputRef.current.type = 'text';
                  fileInputRef.current.type = 'file';
                }

                setPreviewImages([]);
                setProcessedImages([]);
              }}
            >
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
      </Form>
    </>
  );
}
