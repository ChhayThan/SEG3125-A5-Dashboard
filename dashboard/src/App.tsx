import { type FC, useState } from "react";
import { MonthlyView } from "./components/MonthlyView";
import { Navbar } from "./components/Navbar";
import { TimelineView } from "./components/TimelineView";
import { useLanguage } from "./context/LanguageContext";
import { useBudgetData } from "./hooks/useBudgetData";

const App: FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("monthly");
  const { months, addMonth, addTransaction } = useBudgetData();

  return (
    <div
      data-theme="corporate"
      className="bg-base-100 text-base-content font-sans min-w-screen min-h-screen flex flex-col justify-between"
    >
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div
          role="tablist"
          className="tabs tabs-lift justify-center p-1 rounded-lg"
        >
          <a
            role="tab"
            className={`tab tab-lg ${
              activeTab === "monthly"
                ? "tab-active !bg-primary text-primary-content"
                : ""
            }`}
            onClick={() => setActiveTab("monthly")}
          >
            {t("monthlyViewTab")}
          </a>
          <a
            role="tab"
            className={`tab tab-lg ${
              activeTab === "timeline"
                ? "tab-active !bg-primary text-primary-content"
                : ""
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            {t("timelineViewTab")}
          </a>
        </div>

        <div className="mt-4 bg-base-100 rounded-box p-6 shadow">
          {activeTab === "monthly" && (
            <MonthlyView
              months={months}
              addMonth={addMonth}
              addTransaction={addTransaction}
            />
          )}
          {activeTab === "timeline" && <TimelineView allMonths={months} />}
        </div>
      </div>
      <footer className="text-center mt-12 py-4 border-t border-base-300 justify-self-end">
        <p className="text-sm text-neutral-focus">
          MonthlyBud Dashboard &copy; {new Date().getFullYear()}. All data is
          stored locally on your device.
        </p>
      </footer>
    </div>
  );
};

export default App;
