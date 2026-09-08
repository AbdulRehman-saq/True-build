'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuoteModal } from './QuoteModal';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openQuoteModal } = useQuoteModal();


  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Micro top bar */}
      <div className="bg-[var(--surface)] text-[10px] sm:text-xs text-[var(--text-muted)] border-b border-[var(--border)] py-1.5 px-4 sm:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="tracking-wide">
            PE-Licensed Engineering across TX · FL · CA · GA · CO · MA · AZ · UT · KY · NC · SC
          </span>
          <div className="flex items-center gap-5">
            <a href="tel:+18327373912" className="hover:text-[var(--accent)] transition-colors font-mono tracking-wide">
              (832) 737-3912
            </a>
            <span className="w-px h-3 bg-[var(--border)]" />
            <a href="mailto:info@proarchestdesign.com" className="hover:text-[var(--accent)] transition-colors">
              info@proarchestdesign.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-[var(--border)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="relative">
              <div className="w-10 h-10 rounded-md bg-[var(--accent)] flex items-center justify-center text-[var(--foreground)] font-bold text-xl tracking-tight transition-transform group-hover:scale-110 group-hover:rotate-[-2deg]">
                P
              </div>
              <div className="absolute -inset-1 rounded-lg bg-[var(--accent)]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="leading-none">
              <span className="text-lg font-bold tracking-tight text-[var(--foreground)] block">ProArch</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-medium block mt-0.5">
                Design & Estimation
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--foreground)]/[0.04] transition-all duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openQuoteModal()}
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-[var(--foreground)] font-semibold text-sm transition-all duration-200 btn-shimmer active:scale-95 shadow-sm"
            >
              Get a Quote
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-[var(--foreground)]/5 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-[1.5px] bg-[var(--foreground)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-[var(--foreground)] transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-[var(--foreground)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2 pb-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-3xl font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-all duration-300 py-3 ${
                mobileOpen ? 'animate-slide-up' : ''
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              openQuoteModal();
            }}
            className="mt-8 px-8 py-4 rounded-xl bg-[var(--accent)] text-[var(--foreground)] font-bold text-lg transition-all active:scale-95"
          >
            Get a Quote →
          </button>
          <a href="tel:+18327373912" className="mt-4 text-[var(--text-muted)] font-mono text-sm">
            (832) 737-3912
          </a>
        </div>
      </div>

    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] relative">
      {/* Decorative top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[var(--accent)] flex items-center justify-center text-[var(--foreground)] font-bold text-lg">
                P
              </div>
              <div className="leading-none">
                <span className="text-lg font-bold text-[var(--foreground)] block">ProArch</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)] block mt-0.5">Design & Estimation</span>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Permit-ready drafting, PE-stamped structural & MEP engineering, fabrication shop drawings, photorealistic 3D renders, and construction cost estimates delivered nationwide.
            </p>
            <div className="accent-line" />
            <p className="text-xs text-[var(--text-muted)] font-mono tracking-wide">
              Licensed in TX · FL · CA · GA · CO · MA · AZ · UT · KY · NC · SC
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-5">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services/drafting" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">Drafting & Floor Plans</Link></li>
              <li><Link href="/services/engineering" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">Structural & MEP</Link></li>
              <li><Link href="/services/shop-drawings" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">Shop Drawings</Link></li>
              <li><Link href="/services/3d-design" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">3D Rendering & Design</Link></li>
              <li><Link href="/services/estimation-takeoff" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">Estimation & Takeoff</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-5">Contact</h4>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[var(--text-muted)] text-xs block mb-0.5">Phone</span>
                <a href="tel:+18327373912" className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors font-mono text-sm font-medium">
                  (832) 737-3912
                </a>
              </div>
              <div>
                <span className="text-[var(--text-muted)] text-xs block mb-0.5">Email</span>
                <a href="mailto:info@proarchestdesign.com" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors text-sm break-all">
                  info@proarchestdesign.com
                </a>
              </div>
              <div>
                <span className="text-[var(--text-muted)] text-xs block mb-0.5">Office</span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Shady Trail PMB 242<br />Dallas, TX 75229
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-hr" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--text-muted)]">
        <p>© {new Date().getFullYear()} ProArch Design & Estimation. All Rights Reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">Facebook</a>
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
