import clsx from 'clsx';
import { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

type HeadingProps = {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  className?: string;
  asChild?: boolean;
};

export function Heading({
  asChild = false,
  className = '',
  children,
  size = 'base',
}: HeadingProps) {
  const Component = asChild ? Slot : 'h2';

  return (
    <Component
      className={clsx(
        'text-gray-500 font-sans font-semibold',
        {
          'text-lg': size === 'xs',
          'text-xl': size === 'sm',
          'text-2xl': size === 'base',
          'text-3xl': size === 'lg',
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
