import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-[0.14em] transition-all duration-300 select-none disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-ink hover:bg-bone hover:shadow-[0_0_32px_rgba(200,241,53,0.25)]",
  secondary: "bg-bone text-ink hover:bg-white",
  outline:
    "border border-bone/30 text-bone hover:border-lime hover:text-lime hover:shadow-[0_0_24px_rgba(200,241,53,0.12)]",
  ghost: "text-bone hover:text-lime",
  dark: "bg-ink text-bone border border-ink-line hover:border-concrete",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-xs",
  lg: "h-13 px-8 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

interface ButtonProps extends CommonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {}

export function Button({ variant = "primary", size = "md", className, children, ariaLabel, type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends CommonProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ariaLabel,
  onClick,
}: ButtonLinkProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
