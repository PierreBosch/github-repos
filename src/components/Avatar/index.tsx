import { clsx } from 'clsx';
import { ImgHTMLAttributes } from 'react';

type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  avatarUrl: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
};

export function Avatar({
  avatarUrl,
  className = '',
  size = 'md',
  ...props
}: AvatarProps) {
  return (
    <img
      src={avatarUrl}
      className={clsx(
        'rounded-full',
        {
          'w-5 h-5': size === 'xs',
          'w-8 h-8': size === 'sm',
          'w-10 h-10': size === 'md',
          'w-16 h-16': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
