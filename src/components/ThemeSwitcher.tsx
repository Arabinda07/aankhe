import { Check, Monitor, Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import { ThemePreference } from "../lib/appTheme";
import { useThemePreference } from "../hooks/useThemePreference";
import { cn } from "../lib/utils";

const THEME_OPTIONS: Array<{
  value: ThemePreference;
  label: string;
  icon: typeof Monitor;
}> = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export function ThemeSwitcher() {
  const { preference, resolvedTheme, setPreference } = useThemePreference();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const ActiveIcon = preference === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const chooseTheme = (nextPreference: ThemePreference) => {
    setPreference(nextPreference);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`Theme: ${preference}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-ankahe-border bg-ankahe-control text-ankahe-muted transition-colors hover:bg-ankahe-control-hover hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
      >
        <ActiveIcon size={20} weight="light" />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Choose theme"
          className="absolute right-0 top-full z-50 mt-2 min-w-40 rounded-md border border-ankahe-border bg-ankahe-surface p-1.5 shadow-[0_18px_48px_color-mix(in_oklch,var(--color-text)_12%,transparent)]"
        >
          {THEME_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = preference === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => chooseTheme(option.value)}
                className={cn(
                  "type-ui-label flex min-h-11 w-full items-center justify-between gap-4 rounded-sm px-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus",
                  isSelected
                    ? "bg-ankahe-control-selected text-ankahe-text"
                    : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon size={18} weight="light" />
                  {option.label}
                </span>
                {isSelected && <Check size={16} weight="bold" className="text-ankahe-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
