import React from 'react';
export function Button({ children, className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition border';
  const styles = {
    default: 'bg-brand-600 text-white border-brand-600 hover:bg-brand-700',
    secondary: 'bg-white text-brand-600 border-brand-200 hover:bg-brand-50',
    ghost: 'bg-transparent text-brand-700 border-transparent hover:bg-brand-50'
  };
  return <button className={`${base} ${styles[variant] || styles.default} ${className}`} {...props}>{children}</button>;
}
