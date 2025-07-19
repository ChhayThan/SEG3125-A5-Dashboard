import type { FC } from "react";
import { useState } from "react";
import { useLanguage } from "../context/useLanguage";
import type { Income, Expense, Category } from "../types/type";
import { CATEGORIES } from "../types/constants";

interface TransactionFormProps {
  onAddTransaction: (
    monthId: string,
    type: "income" | "expense",
    details: Omit<Income, "id"> | Omit<Expense, "id">
  ) => void;
  selectedMonthId: string;
}

export const TransactionForm: FC<TransactionFormProps> = ({
  onAddTransaction,
  selectedMonthId,
}) => {
  const { t } = useLanguage();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (
      !selectedMonthId ||
      !amount ||
      isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      !date
    ) {
      alert("Please provide a valid date and a positive amount.");
      return;
    }
    const details = { amount: parsedAmount, date };
    if (type === "expense") {
      onAddTransaction(selectedMonthId, type, { ...details, category });
    } else {
      onAddTransaction(selectedMonthId, type, details);
    }
    setAmount("");
  };

  return (
    <div className="card bg-base-200 shadow-xl w-full max-w-lg mx-auto">
      <div className="card-body p-6">
        <h2 className="card-title text-xl mb-4">{t("addTransaction")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4p-5">
          <div className="tabs tabs-lift grid-cols-2">
            <a
              className={`tab ${type === "expense" ? "tab-active" : ""}`}
              onClick={() => setType("expense")}
            >
              {t("expense")}
            </a>
            <a
              className={`tab ${type === "income" ? "tab-active" : ""}`}
              onClick={() => setType("income")}
            >
              {t("income")}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">{t("amount")}</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">{t("date")}</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {type === "expense" && (
            <div className="form-control w-ful bg-white p-5">
              <label className="label mr-3">
                <span className="label-text">{t("category")}</span>
              </label>
              <select
                className="select select-bordered"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(cat)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="card-actions justify-end mt-6">
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              {t("add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
