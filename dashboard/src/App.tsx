import { type FC, useState } from "react";
import { MonthlyView } from "./components/MonthlyView";
import { Navbar } from "./components/Navbar";
import { TimelineView } from "./components/TimelineView";
import { useBudgetData } from "./hooks/useBudgetData";
import { useLanguage } from "./context/useLanguage";

const App: FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("monthly");
  const { months, addMonth, addTransaction, removeTransaction } =
    useBudgetData();

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div
          role="tablist"
          className="tabs tabs-boxed justify-center bg-base-200/60 p-1 rounded-lg"
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

        <div className="mt-4 bg-base-200 rounded-box p-6 shadow">
          {activeTab === "monthly" && (
            <MonthlyView
              months={months}
              addMonth={addMonth}
              addTransaction={addTransaction}
              removeTransaction={removeTransaction}
            />
          )}
          {activeTab === "timeline" && <TimelineView allMonths={months} />}
        </div>
      </div>
      <footer className="text-center mt-12 py-4 border-t border-base-300">
        <p className="text-sm text-neutral-focus">
          MonthlyBud Dashboard &copy; {new Date().getFullYear()}. All data is
          stored locally on your device.
        </p>
      </footer>
    </div>
  );
};

export default App;
