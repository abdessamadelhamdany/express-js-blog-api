import Pica from 'pica';
import Compressor from 'compressorjs';

export interface PreviewImage extends HTMLImageElement {
  size?: number;
}

/**
 * Convert image to PreviewImage
 * @param image image that will be converted
 * @returns PreviewImage
 */
const blobToImageElement = async (image: Blob): Promise<PreviewImage> => {
  return new Promise((resolve) => {
    const imageElement: PreviewImage = new Image();
    imageElement.size = image.size;
    imageElement.onload = function () {
      resolve(imageElement);
    };
    imageElement.src = URL.createObjectURL(image);
  });
};

/**
 *
 * @param image the image that will be resized
 * @param resizeWidth thsi will decide resized images width
 * @returns the resized images
 */
const resizeImage = async (image: Blob, resizeWidth: number[]): Promise<Blob[]> => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const imageElement: PreviewImage = await blobToImageElement(image);

  const resizedImages: Blob[] = [];

  for (const width of resizeWidth) {
    canvas.width = width;
    canvas.height = (imageElement.height * width) / imageElement.width;

    const resizedImage = await (async function (image: Blob, canvas: HTMLCanvasElement): Promise<Blob> {
      return new Promise(async (resolve, reject) => {
        const resizer = Pica({ features: ['js', 'wasm', 'cib', 'ww'] });
        const resizedCanvas = await resizer.resize(image, canvas);

        resizedCanvas.toBlob((resizedImage) => {
          if (resizedImage === null) {
            return reject(new Error('A null blob was encountered.'));
          }

          resolve(resizedImage);
        }, image.type);
      });
    })(image, canvas);

    resizedImages.push(resizedImage);
  }

  return resizedImages;
};

const compressImage = async (image: Blob, quality: number = 0.75): Promise<Blob> => {
  const compressedImage = await ((image: Blob, quality: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      new Compressor(image, {
        quality,
        success(compressedImage) {
          resolve(compressedImage);
        },
        error(err) {
          reject(err);
        },
      });
    });
  })(image, quality);

  return compressedImage;
};

/**
 * Take an image, optimized it, and return two versiona
 *
 * @param image image that will be processed
 * @param width processed images width
 */
const processImage = async (image: Blob, resizeWidth: number | number[] = [460, 720]): Promise<Blob[]> => {
  if (typeof resizeWidth === 'number') {
    resizeWidth = [resizeWidth];
  }

  const resizedImages = await resizeImage(image, resizeWidth);

  const compressedImages: Blob[] = [];
  for (const resizedImage of resizedImages) {
    const compressedImage = await compressImage(resizedImage);
    compressedImages.push(compressedImage);
  }

  return compressedImages;
};

/**
 * Validate image file
 * @param image image that will be validated
 * @returns ValidationError when some error occurs and
 * undefined if no error occurs
 */
const validateImage = (image: Blob): boolean => {
  if (!image.type.startsWith('image/')) {
    return false;
  }
  return true;
};

/**
 * Process image, by resizing and compressing it
 * @returns all needed state and functions for processing images
 */
export const useImageProcessing = () => {
  return { validateImage, processImage, blobToImageElement };
};
