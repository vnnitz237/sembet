import { Shield } from 'lucide-react';

interface StatusPillProps {
  text?: string;
  className?: string;
}

export default function StatusPill({
  text = 'Proteção que acolhe. Liberdade que transforma.',
  className = '',
}: StatusPillProps) {
  return (
    <div
      role="note"
      aria-label={text}
      className={[
        'inline-flex items-center gap-2',
        'px-3.5 py-1.5 rounded-full',
        'bg-white border border-sb-border shadow-sb-sm',
        'text-sb-body text-xs font-medium leading-none',
        'select-none',
        className,
      ].join(' ')}
    >
      <Shield
        aria-hidden="true"
        size={13}
        strokeWidth={2}
        className="text-sb-action flex-shrink-0"
      />
      <span>{text}</span>
    </div>
  );
}
