import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-brand-sage-500 text-white font-semibold px-6 py-2 rounded-2xl shadow hover:bg-brand-sage-600 focus:outline-none focus:ring-2 focus:ring-brand-sage-700 transition ${props.className ?? ""}`}
    />
  );
}
