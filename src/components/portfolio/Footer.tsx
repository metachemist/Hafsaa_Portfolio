'use client';

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--ed-border)' }}>
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
          © {new Date().getFullYear()} {name}
        </p>
        <p className="text-xs" style={{ color: 'var(--ed-muted)', fontFamily: 'var(--font-sans), sans-serif' }}>
          Built with Next.js · Tailwind CSS · Framer Motion
        </p>
      </div>
    </footer>
  );
}
