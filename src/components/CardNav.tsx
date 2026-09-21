'use client';

import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './CardNav.css';

// Safe layout effect for Next.js SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface CardNavLink {
  label: string;
  ariaLabel?: string;
  href?: string;
  onClick?: () => void;
}

export interface CardNavItem {
  label: string;
  bgColor: string;
  textColor: string;
  href?: string;
  onClick?: () => void;
  links?: CardNavLink[];
}

export interface CardNavProps {
  logo?: string | React.ReactNode;
  logoAlt?: string;
  items?: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor = '#111',
  buttonTextColor = '#fff',
  ctaText = 'Get Started',
  onCtaClick
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const contentEl = navEl.querySelector<HTMLElement>('.card-nav-content');
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      const wasPointerEvents = contentEl.style.pointerEvents;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'visible';
      contentEl.style.pointerEvents = 'auto';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';

      void contentEl.offsetHeight;

      const topBar = 60;
      const padding = 16;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = wasVisible;
      contentEl.style.pointerEvents = wasPointerEvents;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        return topBar + contentHeight + padding;
      }
      return Math.max(260, topBar + contentHeight + padding);
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length > 0) {
      tl.to(validCards, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    }

    return tl;
  };

  useIsomorphicLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
      // Fallback safety timeout so the backdrop can never remain stuck open
      setTimeout(() => {
        setIsExpanded(false);
      }, 450);
    }
  };

  const closeMenu = (immediate = false) => {
    setIsHamburgerOpen(false);
    const tl = tlRef.current;
    if (immediate || !tl || !isExpanded) {
      setIsExpanded(false);
      if (tl) tl.pause(0);
      if (navRef.current) gsap.set(navRef.current, { height: 60 });
      if (cardsRef.current) gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 });
      return;
    }

    tl.eventCallback('onReverseComplete', () => {
      setIsExpanded(false);
    });
    tl.reverse();

    // Fallback safety timeout so the backdrop can never remain stuck open
    setTimeout(() => {
      setIsExpanded(false);
    }, 450);
  };

  // Forcibly close and reset the menu whenever the route changes
  useEffect(() => {
    setIsHamburgerOpen(false);
    setIsExpanded(false);
    if (tlRef.current) {
      tlRef.current.pause(0);
    }
    if (navRef.current) {
      gsap.set(navRef.current, { height: 60 });
    }
    if (cardsRef.current) {
      gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 });
    }
  }, [pathname]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el;
  };

  const handleCardClick = (item: CardNavItem, e: React.MouseEvent<HTMLDivElement>) => {
    // If the click originated from an inner link or button, don't trigger the card action
    const target = e.target as HTMLElement;
    if (target.closest('.nav-card-link') || target.closest('a') || target.closest('button')) {
      return;
    }

    if (item.onClick) {
      closeMenu(true);
      item.onClick();
    } else if (item.href) {
      closeMenu(true);
      router.push(item.href);
    }
  };

  const handleCardKeyDown = (item: CardNavItem, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      if (target.closest('.nav-card-link') || target.closest('a') || target.closest('button')) {
        return;
      }
      e.preventDefault();
      if (item.onClick) {
        closeMenu(true);
        item.onClick();
      } else if (item.href) {
        closeMenu(true);
        router.push(item.href);
      }
    }
  };

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        closeMenu(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExpanded]);

  return (
    <>
      {/* Backdrop overlay for focus and tap-outside closing */}
      <div
        className={`card-nav-backdrop ${isExpanded ? 'open' : ''}`}
        onClick={() => closeMenu(false)}
        aria-hidden={!isExpanded}
      />

      <div className={`card-nav-container ${className}`}>
        <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
          <div className="card-nav-top">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMenu();
                }
              }}
              role="button"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              aria-expanded={isExpanded}
              tabIndex={0}
              style={{ color: menuColor || '#000' }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            <div className="logo-container">
              {typeof logo === 'string' ? (
                <Link href="/" onClick={() => closeMenu(true)}>
                  <img src={logo} alt={logoAlt} className="logo" />
                </Link>
              ) : logo ? (
                <Link href="/" onClick={() => closeMenu(true)}>
                  {logo}
                </Link>
              ) : (
                <Link href="/" onClick={() => closeMenu(true)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-[var(--accent)] flex items-center justify-center text-white font-bold text-lg">
                    P
                  </div>
                  <div className="leading-none">
                    <span className="text-base font-bold tracking-tight text-[var(--foreground)] block">ProArch</span>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-medium block">
                      Design & Est.
                    </span>
                  </div>
                </Link>
              )}
            </div>

            <button
              type="button"
              className="card-nav-cta-button"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              onClick={() => {
                closeMenu(true);
                if (onCtaClick) onCtaClick();
              }}
            >
              {ctaText}
            </button>
          </div>

          <div className="card-nav-content" aria-hidden={!isExpanded}>
            {(items || []).slice(0, 3).map((item, idx) => {
              const isCardClickable = Boolean(item.href || item.onClick);
              return (
                <div
                  key={`${item.label}-${idx}`}
                  className={`nav-card ${isCardClickable ? 'is-clickable' : ''}`}
                  ref={setCardRef(idx)}
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                  onClick={(e) => handleCardClick(item, e)}
                  onKeyDown={(e) => handleCardKeyDown(item, e)}
                  role={isCardClickable ? 'button' : undefined}
                  tabIndex={isCardClickable ? 0 : undefined}
                  aria-label={isCardClickable ? `Go to ${item.label}` : undefined}
                >
                  <div className="nav-card-label">
                    <span>{item.label}</span>
                    {isCardClickable && (
                      <ArrowUpRight className="nav-card-label-icon" aria-hidden="true" />
                    )}
                  </div>
                  <div className="nav-card-links">
                    {item.links?.map((lnk, i) => {
                      const isClickable = Boolean(lnk.href || lnk.onClick);
                      if (!isClickable) {
                        return (
                          <div
                            key={`${lnk.label}-${i}`}
                            className="nav-card-link nav-card-link-static"
                            aria-label={lnk.ariaLabel}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <span>{lnk.label}</span>
                          </div>
                        );
                      }

                      const isInternal = lnk.href && lnk.href.startsWith('/');
                      if (isInternal) {
                        return (
                          <Link
                            key={`${lnk.label}-${i}`}
                            className="nav-card-link"
                            href={lnk.href!}
                            aria-label={lnk.ariaLabel}
                            onClick={(e) => {
                              e.stopPropagation();
                              closeMenu(true);
                              if (lnk.onClick) lnk.onClick();
                            }}
                          >
                            <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                            <span>{lnk.label}</span>
                          </Link>
                        );
                      }

                      const isMailto = lnk.href && lnk.href.startsWith('mailto:');
                      if (isMailto) {
                        return (
                          <a
                            key={`${lnk.label}-${i}`}
                            className="nav-card-link"
                            href={lnk.href}
                            aria-label={lnk.ariaLabel}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Explicitly invoke mail client redirect
                              window.location.href = lnk.href!;
                              setTimeout(() => {
                                closeMenu(true);
                              }, 150);
                            }}
                          >
                            <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                            <span>{lnk.label}</span>
                          </a>
                        );
                      }

                      return (
                        <a
                          key={`${lnk.label}-${i}`}
                          className="nav-card-link"
                          href={lnk.href || '#'}
                          aria-label={lnk.ariaLabel}
                          onClick={e => {
                            e.stopPropagation();
                            if (lnk.onClick) {
                              e.preventDefault();
                              closeMenu(true);
                              lnk.onClick();
                            } else {
                              closeMenu(true);
                            }
                          }}
                        >
                          <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                          <span>{lnk.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default CardNav;
