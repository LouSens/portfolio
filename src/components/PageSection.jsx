import React from 'react';

/* A section that can sit on the home page (where Home supplies the id and border) or stand alone on its own page. */
export default function PageSection({ panel, id, className = '', children }) {
  if (panel) return <div className="px-5 sm:px-8 md:px-12 py-8 md:py-12">{children}</div>;
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
