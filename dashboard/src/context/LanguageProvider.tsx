import { useState, type FC, type ReactNode } from "react";
import { resources } from "../data/TranslationResource";
import { LanguageContext } from "./LanguageContext";
export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const changeLanguage = (lng: string) => setLanguage(lng);
  const t = (key: string) => resources[language]?.translation[key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
