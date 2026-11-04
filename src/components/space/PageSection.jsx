import React from 'react';

/* A section that works in both places it appears: as a normal page section on the dedicated pages, and as the
   content of a panel in the 3D space on the home page (where the panel supplies the frame, id and padding). */
export default function PageSection({ panel, id, className = '', children }) {
  if (panel) return <div className="px-5 sm:px-8 md:px-12 py-8 md:py-12">{children}</div>;
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
