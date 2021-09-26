import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { MediaLibrary } from '@/src/interfaces';
import { Container, Section } from '@/src/core-ui/layouts';
import {
  MediaFilesWrapper,
  MediaLibraryModalClose,
  MediaLibraryModalContent,
  MediaLibraryModalHeader,
  MediaLibraryModalTab,
  MediaLibraryModalTabs,
  MediaLibraryModalWrapper,
  UploadMediaFormWrapper,
} from './MediaLibraryModal.styled';
import { MediaFiles, UploadMediaForm } from '@/src/components/pages/dashboard/media-library';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';

export default function MediaLibraryModal({ mediaLibrary }: { mediaLibrary: MediaLibrary[] }) {
  const [activeTab, setActiveTab] = useState<'media-files' | 'upload-file'>('media-files');
  const { isMediaLibraryModalOpen, setIsMediaLibraryModalOpen } = useMediaLibrary();

  return isMediaLibraryModalOpen ? (
    <MediaLibraryModalWrapper>
      <MediaLibraryModalContent>
        <MediaLibraryModalHeader>
          <MediaLibraryModalClose onClick={() => setIsMediaLibraryModalOpen(false)}>
            <XIcon />
          </MediaLibraryModalClose>
        </MediaLibraryModalHeader>

        <MediaLibraryModalTabs>
          <MediaLibraryModalTab
            className={activeTab === 'media-files' ? 'active' : ''}
            onClick={() => setActiveTab('media-files')}
          >
            Media Files
          </MediaLibraryModalTab>
          <MediaLibraryModalTab
            className={activeTab === 'upload-file' ? 'active' : ''}
            onClick={() => setActiveTab('upload-file')}
          >
            Upload New
          </MediaLibraryModalTab>
        </MediaLibraryModalTabs>

        {activeTab === 'upload-file' && (
          <UploadMediaFormWrapper>
            <UploadMediaForm />
          </UploadMediaFormWrapper>
        )}

        {activeTab === 'media-files' && (
          <MediaFilesWrapper>
            <MediaFiles mediaLibrary={mediaLibrary} />
          </MediaFilesWrapper>
        )}
      </MediaLibraryModalContent>
    </MediaLibraryModalWrapper>
  ) : null;
}
