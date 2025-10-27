import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Locale } from "@/lib/translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Try to get locale from localStorage or browser
    const stored = localStorage.getItem("locale");
    if (stored && (stored === "en" || stored === "pt")) {
      return stored as Locale;
    }
    
    // Default to browser language if Portuguese, otherwise English
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("pt") ? "pt" : "en";
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  // Helper function to get nested translation
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English if key not found
        let fallback: unknown = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = (fallback as Record<string, unknown>)[fk];
          } else {
            return key; // Return key if not found in fallback either
          }
        }
        return String(fallback);
      }
    }
    
    return String(value);
  };

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
