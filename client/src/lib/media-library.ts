import Pica from 'pica';
import { getImageSize, loadImage, readableFileSize } from '@/src/lib/helpers';

const Kb = 1024;
const Mb = 1024 * Kb;
const resizer = Pica({ features: ['js', 'wasm', 'cib', 'ww'] });

export interface ResizedImage {
  src: string;
  width: number;
  height: number;
}

type ResizeFunction = (
  url: string,
  options?: { widths?: number[]; minWidth?: number; maxSize?: number }
) => Promise<ResizedImage[]>;

export const resizeImage: ResizeFunction = async (url, options) => {
  const data = await fetch(url);
  const blob = await data.blob();
  const mimeType = blob.type;
  const originalImage = await loadImage(blob);
  const widths =
    options?.widths && Array.isArray(options.widths) && options.widths.length > 0 ? options?.widths : 'auto';
  const minWidth = options?.minWidth || 460;
  const maxSize = options?.maxSize || 70 * 1024;

  console.log('widths', widths);

  const canvas: HTMLCanvasElement = document.createElement('canvas');

  let imageSrc = originalImage.src;
  let imageSize = blob.size;
  let aspectRatio = imageSize > 2 * Mb ? 2 : 1;
  let resizedImage: HTMLImageElement = originalImage;
  let resizedImages: ResizedImage[] = [];

  console.log(originalImage.width, readableFileSize(imageSize));

  // Auto Resize: will reduce width/height until it's less than image max size
  if (widths === 'auto') {
    while (imageSize > maxSize) {
      canvas.width = resizedImage.width / aspectRatio;
      canvas.height = resizedImage.height / aspectRatio;

      if (canvas.width < minWidth) {
        break;
      }

      const resultCanvas = await resizer.resize(blob, canvas);

      imageSrc = resultCanvas.toDataURL(mimeType);

      const currentResizedImage = await loadImage(imageSrc);
      imageSize = await getImageSize(currentResizedImage);

      if (imageSize < 60 * Kb) {
        break;
      }

      resizedImage = currentResizedImage;
      aspectRatio = imageSize > Mb ? 1.5 : 1.25;
    }

    return [
      {
        src: resizedImage.src,
        width: resizedImage.width,
        height: resizedImage.height,
      },
    ];
  }

  // Manual Resize multiple sizes: will generate height from the provided width
  for (let idx = 0; idx < widths.length; idx++) {
    const width = widths[idx];

    canvas.width = width;
    canvas.height = (originalImage.height * width) / originalImage.width;

    const resultCanvas = await resizer.resize(blob, canvas);

    resizedImage = await loadImage(resultCanvas.toDataURL(mimeType));

    console.log(resizedImage.width, readableFileSize(await getImageSize(resizedImage)));

    resizedImages.push({
      src: resizedImage.src,
      width: resizedImage.width,
      height: resizedImage.height,
    });
  }

  return resizedImages;
};
