'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useQuoteModal } from './QuoteModal';
import { useModelExplorer } from './ModelExplorer3DModal';
import { Magnetic } from './FramerMotion';
import { Compass } from 'lucide-react';

import CardNav, { CardNavItem } from './CardNav';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openQuoteModal } = useQuoteModal();
  const { openModelExplorer } = useModelExplorer();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const cardNavItems: CardNavItem[] = useMemo(() => [
    {
      label: "Services",
      href: "/services",
      bgColor: "#131d2e",
      textColor: "#ffffff",
      links: [
        { label: "Drafting & Plans", href: "/services/drafting", ariaLabel: "Architectural Drafting & Floor Plans" },
        { label: "Structural & MEP", href: "/services/engineering", ariaLabel: "Structural & MEP Engineering" },
        { label: "3D BIM & Renders", href: "/services/3d-design", ariaLabel: "3D Rendering & Design" },
        { label: "Cost Estimation", href: "/services/estimation-takeoff", ariaLabel: "Cost Estimation & Takeoff" },
        { label: "Shop Drawings", href: "/services/shop-drawings", ariaLabel: "Fabrication Shop Drawings" },
      ]
    },
    {
      label: "Projects & Tech",
      href: "/projects",
      bgColor: "#1e293b",
      textColor: "#ffffff",
      links: [
        { label: "Projects Gallery", href: "/projects", ariaLabel: "View Portfolio & Projects" },
        { label: "3D BIM Explorer", onClick: () => openModelExplorer(), ariaLabel: "Launch 3D BIM Model Explorer" },
        { label: "Frequently Asked", href: "/faq", ariaLabel: "Frequently Asked Questions" },
        { label: "About ProArch", href: "/about", ariaLabel: "About ProArch Design & Estimation" }
      ]
    },
    {
      label: "Contact & Quote",
      onClick: () => openQuoteModal(),
      bgColor: "#242d3d",
      textColor: "#ffffff",
      links: [
        { label: "(832) 737-3912", ariaLabel: "Phone: (832) 737-3912" },
        { label: "Email Team", href: "mailto:info@proarchestdesign.com", ariaLabel: "Email info@proarchestdesign.com" }
      ]
    }
  ], [openQuoteModal, openModelExplorer]);

  return (
    <>
      {/* Mobile and Tablet CardNav Menu (< 1024px) */}
      <CardNav
        className="lg:hidden"
        items={cardNavItems}
        logo="/ProArch_Logo_Design&Estimation.png"
        logoAlt="ProArch Design & Estimation"
        baseColor="#F7F5F0"
        menuColor="#12161F"
        buttonBgColor="#D8A338"
        buttonTextColor="#ffffff"
        ctaText="Get a Quote"
        onCtaClick={() => openQuoteModal()}
        ease="power3.out"
      />
      <div className="h-20 lg:hidden" aria-hidden="true" />

      {/* Desktop Header (>= 1024px) - Fixed at top screen */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        {/* Micro top bar */}
        <div className="bg-[var(--surface)] text-xs text-[var(--text-muted)] border-b border-[var(--border)] py-1.5 px-8">
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

        {/* Main Desktop Header */}
        <header
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-white/98 backdrop-blur-xl shadow-md border-b border-[var(--border)]'
              : 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[var(--border)]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group py-2">
              <img
                src="/ProArch_Logo_Design&Estimation.png"
                alt="ProArch Design & Estimation"
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.03]"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--foreground)]/[0.04] transition-all duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--foreground)]/[0.04] transition-all duration-200 font-medium cursor-pointer"
              >
                Contact
              </button>
              {/* 3D BIM Explorer Nav Item */}
              <button
                onClick={() => openModelExplorer()}
                className="ml-2 px-3 py-1.5 rounded-lg bg-[var(--foreground)] hover:bg-[var(--accent)] text-white text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-sm border border-transparent cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[var(--accent)] animate-spin-slow" />
                <span>3D BIM Model</span>
              </button>
            </nav>

            {/* Desktop CTA */}
            <div className="flex items-center gap-3">
              <Magnetic pullFactor={0.25}>
                <button
                  onClick={() => openQuoteModal()}
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold text-sm transition-all duration-200 btn-shimmer active:scale-95 shadow-sm cursor-pointer"
                >
                  Get a Quote
                </button>
              </Magnetic>
            </div>
          </div>
        </header>
      </div>
      {/* Desktop spacer to prevent content shift */}
      <div className="hidden lg:block h-[103px]" aria-hidden="true" />
    </>
  );
}

export function Footer() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] relative">
      {/* Decorative top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block group py-1">
              <img
                src="/ProArch_Logo_Design&Estimation.png"
                alt="ProArch Design & Estimation"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
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
              <li>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors duration-200 cursor-pointer text-left"
                >
                  Contact & Quote
                </button>
              </li>
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
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="inline-flex items-center text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                >
                  Open Quote Request →
                </button>
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
