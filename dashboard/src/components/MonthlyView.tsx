import { type FC, useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import type { Month, Income, Expense } from "../types/type";
import { MonthlyCharts } from "./MonthlyCharts";
import { TransactionForm } from "./TranscationForm";

interface MonthlyViewProps {
  months: Month[];
  addMonth: () => void;
  addTransaction: (
    monthId: string,
    type: "income" | "expense",
    details: Omit<Income, "id"> | Omit<Expense, "id">
  ) => void;
}

export const MonthlyView: FC<MonthlyViewProps> = ({
  months,
  addMonth,
  addTransaction,
}) => {
  const { t } = useLanguage();
  const [selectedMonthId, setSelectedMonthId] = useState<string | null>(
    months[0]?.id || null
  );

  useEffect(() => {
    if (!selectedMonthId && months.length > 0) {
      setSelectedMonthId(months[0].id);
    }
    if (selectedMonthId && !months.find((m) => m.id === selectedMonthId)) {
      setSelectedMonthId(months[0]?.id || null);
    }
  }, [months, selectedMonthId]);

  const selectedMonthData = useMemo(
    () => months.find((m) => m.id === selectedMonthId),
    [months, selectedMonthId]
  );

  if (months.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl mb-4">{t("noMonths")}</p>
        <button className="btn btn-primary" onClick={addMonth}>
          {t("addMonth")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <h2 className="text-lg font-semibold">{t("selectMonth")}:</h2>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedMonthId || ""}
          onChange={(e) => setSelectedMonthId(e.target.value)}
        >
          {months.map((month) => (
            <option key={month.id} value={month.id}>
              {t("month")} {month.name.split(" ")[1]}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary btn-outline" onClick={addMonth}>
          {t("addMonth")}
        </button>
      </div>
      {selectedMonthData && (
        <>
          <TransactionForm
            onAddTransaction={addTransaction}
            selectedMonthId={selectedMonthId as string}
          />
          <MonthlyCharts monthData={selectedMonthData} />
        </>
      )}
    </div>
  );
};
