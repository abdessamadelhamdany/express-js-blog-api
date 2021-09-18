import React from 'react';
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
import { MediaLibrary } from '@/src/interfaces/models/MediaLibrary';
import ResponsiveImage from '@/src/components/common/ResponsiveImage';
import { readableFileSize } from '@/src/lib/helpers';

export default function MediaFilesComponent({ mediaLibrary }: { mediaLibrary: MediaLibrary[] }) {
  return (
    <MediaFiles>
      {mediaLibrary.map((mediaFile) => {
        return (
          mediaFile.path && (
            <MediaFile key={mediaFile.id}>
              <ResponsiveImage src={mediaFile.path} alt={mediaFile.alt} />
              <MediaFileDetail>
                <MediaFileTitle>{mediaFile.caption || mediaFile.alt}</MediaFileTitle>
                <MediaFileSize>{readableFileSize(mediaFile.size)}</MediaFileSize>
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
          )
        );
      })}
    </MediaFiles>
  );
}
