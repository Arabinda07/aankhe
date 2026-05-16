import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { Monitor } from "@phosphor-icons/react/dist/csr/Monitor";
import { Moon } from "@phosphor-icons/react/dist/csr/Moon";
import { Sun } from "@phosphor-icons/react/dist/csr/Sun";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
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
  const ActiveIcon = preference === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={`Theme: ${preference}`}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
      >
        <ActiveIcon size={20} weight="light" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-40 rounded-md border border-parichay-border bg-parichay-surface p-1.5 shadow-[0_18px_48px_color-mix(in_oklch,var(--color-text)_12%,transparent)]"
          aria-label="Choose theme"
        >
          <DropdownMenu.RadioGroup value={preference} onValueChange={(value) => setPreference(value as ThemePreference)}>
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = preference === option.value;

              return (
                <DropdownMenu.RadioItem
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "type-ui-label flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 rounded-sm px-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus",
                    isSelected
                      ? "bg-parichay-control-selected text-parichay-text"
                      : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={16} weight="light" />
                    {option.label}
                  </span>
                  {isSelected && <Check size={16} weight="bold" className="text-parichay-accent" />}
                </DropdownMenu.RadioItem>
              );
            })}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
