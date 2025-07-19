import type { FC } from "react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanuageSwitcher";

export const Navbar: FC = () => {
  const { t } = useLanguage();
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-sm sticky top-0 z-30 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-2xl font-bold text-primary">
          {t("appTitle")}
        </a>
      </div>
      <div className="navbar-end">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
