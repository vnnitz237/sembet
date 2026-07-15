import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { SemBetLinkButton } from '../ui/SemBetButton';

const NAV_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Proteção', href: '#protecao' },
  { label: 'Apoio', href: '#apoio' },
  { label: 'Perguntas', href: '#perguntas' },
];

export default function FloatingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-[var(--sb-z-nav)] h-[var(--sb-nav-height)]"
      style={{ zIndex: 'var(--sb-z-nav)' }}
    >
      {/* Nav bar */}
      <nav
        aria-label="Navegação principal"
        className={[
          'h-full mx-auto max-w-container px-[var(--sb-gutter)]',
          'flex items-center justify-between gap-8',
          /* Prepared for scroll-aware background — add class via JS in Etapa 4 */
          'sb-navbar',
        ].join(' ')}
        style={{
          /* Transparent now; will receive backdrop-blur + bg on scroll (Etapa 4) */
          background: 'transparent',
        }}
      >
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sb-action focus-visible:outline-offset-3 rounded-sb-sm"
          aria-label="SemBet — página inicial"
        >
          {/* Compact S mark — simplified SVG, related to GlassS but legible at small size */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="30" height="30" rx="9" fill="#318AC7" />
            <path
              d="M 21,9.5 C 21,7.2 19,6 16.5,6 C 12.5,6 9,8.2 9,11.8 C 9,15 12,16.4 14.8,17.6 C 17.6,18.8 21,20.2 21,24 C 21,26.5 18.5,26.8 16,26.8 C 13,26.8 10.2,25.4 9,24"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sb-heading font-bold text-[15px] tracking-tight leading-none select-none">
            SemBet
          </span>
        </a>

        {/* Desktop links */}
        <ul
          role="list"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={[
                  'relative px-3.5 py-2 rounded-md',
                  'text-sb-body text-[13px] font-medium tracking-wide',
                  'transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                  'hover:text-sb-heading hover:bg-sb-border-subtle',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-sb-action focus-visible:outline-offset-2',
                ].join(' ')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <SemBetLinkButton href="#protecao" variant="primary" size="sm">
            Quero minha proteção
          </SemBetLinkButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={[
            'lg:hidden w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0',
            'text-sb-heading transition-colors duration-[220ms]',
            'hover:bg-sb-border-subtle',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-sb-action focus-visible:outline-offset-2',
          ].join(' ')}
        >
          {mobileOpen ? <X size={20} strokeWidth={2} aria-hidden /> : <Menu size={20} strokeWidth={2} aria-hidden />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className={[
            'lg:hidden absolute top-[var(--sb-nav-height)] inset-x-0',
            'bg-white border-b border-sb-border shadow-sb-md',
            'px-[var(--sb-gutter)] py-6 flex flex-col gap-1',
          ].join(' ')}
          style={{ top: 'var(--sb-nav-height)' }}
        >
          <ul role="list" className="flex flex-col gap-1 mb-5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'block px-3 py-3 rounded-md',
                    'text-sb-body text-[15px] font-medium',
                    'transition-colors duration-[220ms]',
                    'hover:text-sb-heading hover:bg-sb-border-subtle',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-sb-action focus-visible:outline-offset-2',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <SemBetLinkButton
            href="#protecao"
            variant="primary"
            size="md"
            className="w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            Quero minha proteção
          </SemBetLinkButton>
        </div>
      )}
    </header>
  );
}
