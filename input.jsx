import React from 'react';
export function Input({ className = '', ...props }) {
  return <input className={`w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-200 ${className}`} {...props} />;
}
