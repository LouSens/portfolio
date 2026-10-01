import React from 'react';

/* Magnetic pull was removed because it did not fit the site's flat style.
   This stays as a plain wrapper so existing call sites keep their layout classes. */
export default function Magnetic({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}
