import { ReactNode } from "react";

export default function Alert({ children, type = "success" }: { children: ReactNode; type?: "success" | "error" }) {
  const color = type === "success" ? "bg-sage text-offwhite" : "bg-red-200 text-graphite";
  return (
    <div className={`rounded-2xl px-4 py-2 my-2 font-semibold ${color}`} role="alert" aria-live="polite">
      {children}
    </div>
  );
}
