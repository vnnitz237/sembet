import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface SemBetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

const SemBetButton = forwardRef<HTMLButtonElement, SemBetButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide ' +
      'transition-all duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] ' +
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sb-action ' +
      'disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap';

    const variants: Record<Variant, string> = {
      primary:
        'bg-sb-action text-white shadow-sb-action ' +
        'hover:bg-sb-action-dark hover:shadow-[0_6px_24px_rgba(49,138,199,0.28)] ' +
        'active:scale-[0.98]',
      secondary:
        'bg-white/80 text-sb-heading border border-sb-border shadow-sb-sm ' +
        'hover:bg-white hover:border-sb-light-blue hover:shadow-sb-md ' +
        'active:scale-[0.98]',
    };

    return (
      <button
        ref={ref}
        className={[base, variants[variant], SIZE_CLASSES[size], className].join(' ')}
        {...props}
      >
        {children}
      </button>
    );
  },
);

SemBetButton.displayName = 'SemBetButton';

export default SemBetButton;

/* Anchor variant for links that look like buttons */
interface SemBetLinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

export function SemBetLinkButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: SemBetLinkButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide ' +
    'transition-all duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sb-action ' +
    'select-none whitespace-nowrap cursor-pointer';

  const variants: Record<Variant, string> = {
    primary:
      'bg-sb-action text-white shadow-sb-action ' +
      'hover:bg-sb-action-dark hover:shadow-[0_6px_24px_rgba(49,138,199,0.28)] ' +
      'active:scale-[0.98]',
    secondary:
      'bg-white/80 text-sb-heading border border-sb-border shadow-sb-sm ' +
      'hover:bg-white hover:border-sb-light-blue hover:shadow-sb-md ' +
      'active:scale-[0.98]',
  };

  return (
    <a
      className={[base, variants[variant], SIZE_CLASSES[size], className].join(' ')}
      {...props}
    >
      {children}
    </a>
  );
}
