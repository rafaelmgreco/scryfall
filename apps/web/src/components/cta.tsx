import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './cta.module.css';

interface CTAProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  fullWidth?: boolean;
}

export function CTA({
  href,
  children,
  variant = 'primary',
  className = '',
  fullWidth = false,
}: CTAProps) {
  const classes = [
    styles.cta,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
