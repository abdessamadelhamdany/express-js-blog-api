import { ImageLoader } from 'next/image';

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `http://localhost:1774/${src}?w=${width}&q=${quality || 75}`;
};

export default imageLoader;
