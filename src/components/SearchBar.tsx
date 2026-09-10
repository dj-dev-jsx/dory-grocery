import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({ value, onChange, onSubmit, placeholder, autoFocus, className = "" }: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={`relative flex items-center ${className}`}
    >
      <Search size={18} className="pointer-events-none absolute left-3.5 text-slate-400" />
      <input
        type="search"
        inputMode="search"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search for groceries..."}
        className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-fresh-400 focus:bg-white focus:ring-2 focus:ring-fresh-100"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-white hover:bg-slate-400"
        >
          <X size={12} />
        </button>
      )}
    </form>
  );
}
