import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { MediaLibrary } from '@/src/interfaces';
import { Container, Section } from '@/src/core-ui/layouts';
import {
  MediaFilesWrapper,
  MediaLibraryModalClose,
  MediaLibraryModalContent,
  MediaLibraryModalHeader,
  MediaLibraryModalWrapper,
  UploadMediaFormWrapper,
} from './MediaLibraryModal.styled';
import { MediaFiles, UploadMediaForm } from '@/src/components/pages/dashboard/media-library';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';

export default function MediaLibraryModal({ mediaLibrary }: { mediaLibrary: MediaLibrary[] }) {
  const { isMediaLibraryModalOpen, setIsMediaLibraryModalOpen } = useMediaLibrary();

  return isMediaLibraryModalOpen ? (
    <MediaLibraryModalWrapper>
      <MediaLibraryModalContent>
        <MediaLibraryModalHeader>
          <MediaLibraryModalClose onClick={() => setIsMediaLibraryModalOpen(false)}>
            <XIcon />
          </MediaLibraryModalClose>
        </MediaLibraryModalHeader>

        <UploadMediaFormWrapper>
          <UploadMediaForm />
        </UploadMediaFormWrapper>

        <MediaFilesWrapper>
          <MediaFiles mediaLibrary={mediaLibrary} />
        </MediaFilesWrapper>
      </MediaLibraryModalContent>
    </MediaLibraryModalWrapper>
  ) : null;
}
