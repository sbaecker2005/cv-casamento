import { ReactNode } from "react";

export default function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bg-offwhite rounded-2xl shadow p-6 mb-8 ${className}`}>
      {children}
    </section>
  );
}
