import React from 'react';
import Link from 'next/link';

interface TabProps {
  activeId: 'drafting' | 'engineering' | 'shop-drawings' | '3d-design' | 'estimation-takeoff' | 'all';
}

export function ServiceTabNav({ activeId }: TabProps) {
  const tabs = [
    { id: 'drafting', label: '01. Drafting', href: '/services/drafting' },
    { id: 'engineering', label: '02. Engineering', href: '/services/engineering' },
    { id: 'shop-drawings', label: '03. Shop Drawings', href: '/services/shop-drawings' },
    { id: '3d-design', label: '04. 3D Design', href: '/services/3d-design' },
    { id: 'estimation-takeoff', label: '05. Estimation & Takeoff', href: '/services/estimation-takeoff' },
  ];

  return (
    <div className="border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex overflow-x-auto gap-2 py-3.5 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--accent)] text-white font-bold shadow-lg shadow-[var(--accent)]/15'
                    : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/[0.04] border border-transparent hover:border-[var(--border)]'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Backwards compatibility alias
export const DraftingTabNav = ServiceTabNav;

