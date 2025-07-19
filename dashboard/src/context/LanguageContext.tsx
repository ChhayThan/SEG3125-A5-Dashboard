import { createContext } from "react";
import type { LanguageContextType } from "../types/type";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
