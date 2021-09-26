import React, { useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import {
  MediaFiles,
  MediaFile,
  MediaFileDetail,
  MediaFileTitle,
  MediaFileSize,
  MediaFileActions,
  MediaFileAction,
} from './MediaFiles.styled';
import ResponsiveImage from '@/src/components/common/ResponsiveImage';
import { readableFileSize } from '@/src/lib/helpers';
import { useMediaLibrary } from '@/src/hooks/contexts/useMediaLibrary';
import { MediaLibrary } from '@/src/interfaces/models/MediaLibrary';

interface Props {
  mediaLibrary: MediaLibrary[];
}

export default function MediaFilesComponent({ mediaLibrary: initialMediaLibrary }: Props) {
  const { mediaLibrary, setMediaLibrary, mediaFile, setMediaFile, setInsertedImage, setIsMediaLibraryModalOpen } =
    useMediaLibrary();

  useEffect(() => {
    setMediaLibrary(
      initialMediaLibrary.map((mediaLibraryItem) => {
        if (mediaLibraryItem.mediaFiles) {
          mediaLibraryItem.mediaFiles = [
            mediaLibraryItem.mediaFiles.reduce((previous, current) => {
              const currentWidth = current.width || 0;
              const previousWidth = previous.width || 0;

              return currentWidth > previousWidth ? current : previous;
            }),
          ];
        }
        return mediaLibraryItem;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MediaFiles>
      {mediaLibrary.map((mediaLib, idx) => (
        <div key={idx}>
          {mediaLib.mediaFiles && mediaLib.mediaFiles.length > 0 && mediaLib.mediaFiles[0].path && (
            <MediaFile
              key={mediaLib.id}
              className={mediaFile.id === mediaLib.mediaFiles[0].id ? 'active' : ''}
              onClick={() => {
                if (mediaLib.mediaFiles && mediaLib.mediaFiles.length > 0) {
                  setMediaFile(mediaLib.mediaFiles[0]);
                  setInsertedImage(mediaLib.mediaFiles[0].path);
                  setIsMediaLibraryModalOpen(false);
                }
              }}
            >
              <ResponsiveImage src={mediaLib.mediaFiles[0].path} alt={mediaLib.alt} />
              <MediaFileDetail>
                <MediaFileTitle>{mediaLib.caption || mediaLib.alt}</MediaFileTitle>
                <MediaFileSize>{readableFileSize(mediaLib.mediaFiles[0].size)}</MediaFileSize>
              </MediaFileDetail>
              <MediaFileActions>
                <MediaFileAction variant="success">
                  <PencilIcon />
                </MediaFileAction>
                <MediaFileAction variant="danger">
                  <TrashIcon />
                </MediaFileAction>
              </MediaFileActions>
            </MediaFile>
          )}
        </div>
      ))}
    </MediaFiles>
  );
}
