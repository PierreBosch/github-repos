import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  className?: string;
  asChild?: boolean;
};

export function Text({ asChild, className = '', children, size = 'base' }: TextProps) {
  const Component = asChild ? Slot : 'span';

  return (
    <Component
      className={clsx(
        'text-gray-500 font-sans',
        {
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-base': size === 'base',
          'text-lg': size === 'lg',
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
