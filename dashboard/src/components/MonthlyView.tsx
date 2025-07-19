import { type FC, useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/useLanguage";
import type { Month, Income, Expense } from "../types/type";
import { MonthlyCharts } from "./MonthlyCharts";
import { TransactionForm } from "./TransactionForm";
import { TransactionList } from "./TransactionList";

interface MonthlyViewProps {
  months: Month[];
  addMonth: () => string;
  addTransaction: (
    monthId: string,
    type: "income" | "expense",
    details: Omit<Income, "id"> | Omit<Expense, "id">
  ) => void;
  removeTransaction: (
    monthId: string,
    transactionId: string,
    type: "income" | "expense"
  ) => void;
}

export const MonthlyView: FC<MonthlyViewProps> = ({
  months,
  addMonth,
  addTransaction,
  removeTransaction,
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

  const handleAddMonth = () => {
    const newMonthId = addMonth();
    setSelectedMonthId(newMonthId);
  };

  if (months.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl mb-4">{t("noMonths")}</p>
        <button className="btn btn-primary" onClick={handleAddMonth}>
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
        <button
          className="btn btn-secondary btn-outline"
          onClick={handleAddMonth}
        >
          {t("addMonth")}
        </button>
      </div>
      {selectedMonthData && (
        <>
          <TransactionForm
            onAddTransaction={addTransaction}
            selectedMonthId={selectedMonthId as string}
          />
          <TransactionList
            incomes={selectedMonthData.incomes}
            expenses={selectedMonthData.expenses}
            onRemove={(transactionId, type) =>
              removeTransaction(selectedMonthId as string, transactionId, type)
            }
          />
          <MonthlyCharts monthData={selectedMonthData} />
        </>
      )}
    </div>
  );
};
