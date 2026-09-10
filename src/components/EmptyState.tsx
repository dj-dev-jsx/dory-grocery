import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fresh-50 text-fresh-400">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      {description && <p className="max-w-xs text-sm text-slate-500">{description}</p>}
      {action}
    </div>
  );
}
