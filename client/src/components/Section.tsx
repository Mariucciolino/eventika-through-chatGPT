import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)}>
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-16 relative inline-block w-full">
          <span className="relative z-10">{title}</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary/20 rounded-full"></span>
        </h2>
        {children}
      </div>
    </section>
  );
}
