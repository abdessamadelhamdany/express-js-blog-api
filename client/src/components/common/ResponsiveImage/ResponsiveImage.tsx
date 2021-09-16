import { FC } from 'react';
import Image, { ImageProps } from 'next/image';
import imageLoader from '@/src/lib/image.loader';
import { ResponsiveImageWrapper } from './ResponsiveImage.styled';

interface Props extends ImageProps {}

const ResponsiveImage: FC<Props> = (props) => {
  return (
    <ResponsiveImageWrapper>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...props} {...{ loader: props.loader || imageLoader }} />
    </ResponsiveImageWrapper>
  );
};

export default ResponsiveImage;
