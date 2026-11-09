import type { ImgHTMLAttributes } from 'react';
import { imageAssets } from '../image-assets';

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string;
  alt: string;
};

// Keep existing source URLs as the content reference; serve smaller derivatives.
export default function OptimizedImage({ src, alt, loading = 'lazy', decoding = 'async', ...props }: ImageProps) {
  const asset = imageAssets[src as keyof typeof imageAssets];
  return <img
    loading={loading}
    decoding={decoding}
    width={asset?.width}
    height={asset?.height}
    {...props}
    src={asset?.src ?? src}
    srcSet={props.srcSet ?? asset?.srcSet}
    alt={alt}
  />;
}
