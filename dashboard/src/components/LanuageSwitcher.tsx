import type { FC } from "react";
import { useLanguage } from "../context/LanguageContext";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LanguageSwitcher: FC = () => {
  const { language, changeLanguage } = useLanguage();
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost text-2xl">
        <FontAwesomeIcon icon={faLanguage} />
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
      >
        <li>
          <button
            onClick={() => changeLanguage("en")}
            className={language === "en" ? "font-bold" : ""}
          >
            English
          </button>
        </li>
        <li>
          <button
            onClick={() => changeLanguage("fr")}
            className={language === "fr" ? "font-bold" : ""}
          >
            Français
          </button>
        </li>
      </ul>
    </div>
  );
};
