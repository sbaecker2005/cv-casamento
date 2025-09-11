import { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-offwhite rounded-2xl shadow p-4 ${className}`}>
      {children}
    </div>
  );
}
