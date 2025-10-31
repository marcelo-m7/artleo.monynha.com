import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/I18nContext";

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label="Change language">
          <Languages className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Language options">
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={locale === "en" ? "bg-accent" : ""}
          aria-current={locale === "en" ? "true" : undefined}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("pt")}
          className={locale === "pt" ? "bg-accent" : ""}
          aria-current={locale === "pt" ? "true" : undefined}
        >
          Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
