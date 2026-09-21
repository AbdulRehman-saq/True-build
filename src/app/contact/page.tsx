'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/Animations';
import { ContactFormSection } from '@/components/ContactFormSection';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden blueprint-grid-subtle">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        <div>
          <ScrollReveal>
            <div className="accent-line mb-5" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-500 font-semibold mb-3">
              <span>Direct Team Communication</span>
            </div>
            <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
              Get in touch,{' '}
              <span className="text-gradient">request a project quote.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mt-4">
              Send us your project scope, drawing files, or takeoff requirements. Our licensed engineers and estimators typically respond within 24 to 48 hours.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-8 bg-white/80 backdrop-blur-md border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">
              Direct Contact Channels
            </h2>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">Phone</span>
                  <a href="tel:+18327373912" className="text-base font-mono font-bold text-[var(--foreground)] hover:text-amber-500 transition-colors">
                    (832) 737-3912
                  </a>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Mon - Fri, 8:00 AM – 6:00 PM CST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">Email</span>
                  <a href="mailto:info@proarchestdesign.com" className="text-base font-semibold text-[var(--foreground)] hover:text-amber-500 transition-colors break-all">
                    info@proarchestdesign.com
                  </a>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Send PDF drawings or CAD files directly</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">Office Location</span>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    Shady Trail PMB 242<br />Dallas, TX 75229
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">PE Licensing</span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5">
                    Active Professional Engineer stamps in Texas, Florida, California, Georgia, Colorado, Massachusetts, Arizona, Utah, Kentucky, North Carolina, and South Carolina.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactFormSection />
          </div>
        </div>
      </div>
    </section>
  );
}
