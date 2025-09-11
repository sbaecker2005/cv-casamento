import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`border border-brand-sage-300 rounded-2xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-sage-500 transition ${props.className ?? ""}`}
  />
));
Input.displayName = 'Input';

export default Input;
