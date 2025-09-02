import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({
  className,
  type = "text",
  ...props
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 bg-white text-slate-900 placeholder:text-slate-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;