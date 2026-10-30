import { getImage } from 'astro:assets';

/**
 * The rotating hero photographs behind the homepage greeting: Evan as movie
 * characters. Every file in `src/assets/moviestar/` is picked up automatically,
 * so adding a picture means dropping it in that folder (see D-0011).
 */
export type Photo = {
  src: string;
  width: number;
  height: number;
};

const modules = import.meta.glob<ImageMetadata>('../assets/moviestar/*.png', {
  eager: true,
  import: 'default',
});

/**
 * Optimises every photograph at build time and returns them in filename order.
 * Sources are roughly 330 px wide, so they are emitted at their intrinsic width
 * rather than upscaled into a blur.
 */
export const loadPhotos = async (): Promise<Photo[]> => {
  const entries = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b));

  return Promise.all(
    entries.map(async ([, image]) => {
      const optimized = await getImage({
        src: image,
        width: image.width,
        format: 'webp',
        quality: 88,
      });

      return {
        src: optimized.src,
        width: image.width,
        height: image.height,
      };
    }),
  );
};
