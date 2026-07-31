'use client';

import { usePathname } from 'next/navigation';

interface PublicLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export default function PublicLayout({ children, header, footer }: PublicLayoutProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="running-folio">
        MARKYYY<span className="dot" /> — VOL 01
      </div>
      {header}
      {children}
      {footer}
    </>
  );
}
