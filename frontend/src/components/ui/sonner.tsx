'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

// This app has a single fixed dark theme (no next-themes/light mode), so unlike the
// stock shadcn sonner component this always renders in dark mode, themed to match the
// glass palette in globals.css instead of shadcn's default popover/border tokens.
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      style={
        {
          '--normal-bg': 'rgba(20, 20, 26, 0.9)',
          '--normal-text': 'var(--foreground)',
          '--normal-border': 'var(--glass-border)',
          '--success-bg': 'rgba(20, 20, 26, 0.9)',
          '--success-border': 'var(--accent-2)',
          '--error-bg': 'rgba(20, 20, 26, 0.9)',
          '--error-border': '#f87171',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'backdrop-blur-xl',
        },
      }}
      {...props}
    />
  );
}
