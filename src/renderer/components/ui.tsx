import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "quiet";
}) {
  const styles = {
    primary:
      "bg-moss text-white hover:bg-moss-soft dark:bg-moss-bright dark:text-night dark:hover:opacity-90",
    ghost:
      "border border-paper-line bg-transparent hover:bg-paper-muted dark:border-night-line dark:hover:bg-night-raised",
    danger: "bg-clay text-white hover:opacity-90",
    quiet: "text-paper-fade hover:text-paper-ink dark:text-night-fade dark:hover:text-night-ink"
  } as const;
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-semibold transition disabled:opacity-40",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-paper-line bg-white/70 p-5 shadow-sm dark:border-night-line dark:bg-night-raised/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-paper-fade dark:text-night-fade">
        {label}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-md border border-paper-line bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-moss/40 dark:border-night-line dark:bg-night dark:text-night-ink",
        props.className
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-md border border-paper-line bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-moss/40 dark:border-night-line dark:bg-night dark:text-night-ink",
        props.className
      )}
    />
  );
}

export function Badge({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "moss";
}) {
  const tones = {
    neutral: "bg-paper-muted text-paper-ink dark:bg-night dark:text-night-ink",
    good: "bg-moss/15 text-moss dark:bg-moss/25 dark:text-moss-bright",
    warn: "bg-clay/15 text-clay dark:text-clay-soft",
    moss: "bg-moss text-white dark:bg-moss-bright dark:text-night"
  };
  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-semibold", tones[tone])}>
      {children}
    </span>
  );
}
