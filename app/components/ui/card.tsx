// components/ui/card.tsx
import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-xl border bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div {...props} className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
