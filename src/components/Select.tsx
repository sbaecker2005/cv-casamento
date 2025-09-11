import { SelectHTMLAttributes, forwardRef } from "react";

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => (
  <select
    ref={ref}
    {...props}
    className={`border border-brand-sage-300 rounded-2xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-sage-500 transition ${props.className ?? ""}`}
  />
));
Select.displayName = 'Select';

export default Select;
