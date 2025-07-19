import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import type { LanguageContextType } from "../types/type";

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return ctx;
}
