import React from 'react';
export function Button({ children, className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition border';
  const styles = {
    default: 'bg-slate-900 text-white border-slate-900 hover:opacity-90',
    secondary: 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'
  };
  return <button className={`${base} ${styles[variant] || styles.default} ${className}`} {...props}>{children}</button>;
}
