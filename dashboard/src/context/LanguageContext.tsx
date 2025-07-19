import {
  createContext,
  type FC,
  type ReactNode,
  useState,
  useContext,
} from "react";
import type { LanguageContextType } from "../types/type";
import { resources } from "../data/TranslationResource";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const changeLanguage = (lng: string) => setLanguage(lng);
  const t = (key: string): string =>
    resources[language]?.translation[key] || key;
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
