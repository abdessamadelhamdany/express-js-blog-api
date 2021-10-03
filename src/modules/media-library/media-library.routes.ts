import { IRoute } from '../../interfaces';

export default [
  {
    name: 'Media Library',
    path: 'media-library',
    method: 'get',
    action: 'index',
    description: 'Get all media library metadata',
    middlewares: [],
  },
  {
    name: 'Upload',
    path: 'media-library/upload',
    method: 'post',
    action: 'upload',
    description: 'Upload a image to the media library',
    middlewares: ['global::editor'],
  },
] as IRoute[];
