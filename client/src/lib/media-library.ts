import Pica from 'pica';
import { getImageSize, loadImage } from '@/src/lib/helpers';

const Mb = 1024 * 1024;
const resizer = Pica({ features: ['js', 'wasm', 'cib', 'ww'] });

type ResizeFunction = (
  url: string,
  options?: { width?: 'auto' | number; maxSize?: number }
) => Promise<HTMLImageElement>;

export const resizeImage: ResizeFunction = async (url, options) => {
  const data = await fetch(url);
  const blob = await data.blob();
  const mimeType = blob.type;
  const originalImage = await loadImage(blob);
  const width = options?.width || 'auto';
  const maxImageSize = options?.maxSize || 70 * 1024;

  const canvas: HTMLCanvasElement = document.createElement('canvas');

  let imageSrc = originalImage.src;
  let imageSize = blob.size;
  let aspectRatio = imageSize > 2 * Mb ? 2 : 1;
  let resizedImage: HTMLImageElement = originalImage;

  // Auto Resize: will reduse width/height until it's less than image max size
  if (width === 'auto') {
    while (imageSize > maxImageSize) {
      canvas.width = resizedImage.width / aspectRatio;
      canvas.height = resizedImage.height / aspectRatio;

      const resultCanvas = await resizer.resize(blob, canvas);

      imageSrc = resultCanvas.toDataURL(mimeType);
      resizedImage = await loadImage(imageSrc);

      imageSize = await getImageSize(resizedImage);
      aspectRatio = imageSize > Mb ? 1.5 : 1.25;
    }

    return resizedImage;
  }

  if (typeof width !== 'number') {
    throw "When the width option is not 'auto' it should be a number.";
  }

  // Manual Resize: will generate height from the provided width
  canvas.width = width;
  canvas.height = (originalImage.height * width) / originalImage.width;

  const resultCanvas = await resizer.resize(blob, canvas);

  return await loadImage(resultCanvas.toDataURL(mimeType));
};
