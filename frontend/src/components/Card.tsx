// src/components/Card.tsx
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-xl border border-black/[.08] dark:border-white/[.145] bg-background shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };