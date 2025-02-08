import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={`file-input file-input-bordered w-full ${className}`} {...props} />;
  },
);

Input.displayName = "Input";

export { Input };
