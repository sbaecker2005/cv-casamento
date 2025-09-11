import { TextareaHTMLAttributes, forwardRef } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={`border border-brand-sage-300 rounded-2xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-sage-500 transition resize-none ${props.className ?? ""}`}
  />
));
Textarea.displayName = 'Textarea';

export default Textarea;
