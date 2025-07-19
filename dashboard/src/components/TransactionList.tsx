import { type FC, useState } from "react";
import { useLanguage } from "../context/useLanguage";
import type { Income, Expense } from "../types/type";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TransactionListProps {
  incomes: Income[];
  expenses: Expense[];
  onRemove: (transactionId: string, type: "income" | "expense") => void;
}

export const TransactionList: FC<TransactionListProps> = ({
  incomes,
  expenses,
  onRemove,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");

  const renderRow = (
    transaction: Income | Expense,
    type: "income" | "expense"
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isExpense = (t: any): t is Expense => t.category !== undefined;
    return (
      <div
        key={transaction.id}
        className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center p-3 hover:bg-base-200 transition-colors duration-200"
      >
        <div className="max-[450px]:col-span-2">
          <p className="font-medium">
            {isExpense(transaction) ? t(transaction.category) : t("income")}
          </p>
          <p className="text-sm text-neutral-500">
            {new Date(transaction.date).toLocaleDateString()}
          </p>
          <p
            className={`text-sm font-mono text-center min-[450px]:hidden font-bold ${
              type === "expense" ? "text-red-600" : "text-green-600"
            }`}
          >
            {type === "expense" ? "-" : "+"} ${transaction.amount.toFixed(2)}
          </p>
        </div>
        <div
          className={`text-right md:col-span-2 font-mono max-[451px]:hidden font-bold ${
            type === "expense" ? "text-red-600" : "text-green-600"
          }`}
        >
          {type === "expense" ? "-" : "+"} ${transaction.amount.toFixed(2)}
        </div>
        <div className="text-right">
          <button
            onClick={() => onRemove(transaction.id, type)}
            className="btn btn-ghost btn-circle btn-sm text-red-500"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    );
  };

  const list = activeTab === "expense" ? expenses : incomes;

  return (
    <div className="card bg-base-200 shadow-xl w-full max-w-4xl mx-auto mt-8">
      <div className="card-body p-6 gap-0">
        <h2 className="card-title text-xl mb-4">{t("transactions")}</h2>
        <div className="tabs tabs-lift grid-cols-2">
          <a
            className={`tab ${activeTab === "expense" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("expense")}
          >
            {t("expense")}
          </a>
          <a
            className={`tab ${activeTab === "income" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("income")}
          >
            {t("income")}
          </a>
        </div>
        <div className="p-5 space-y-2 bg-white">
          {list.length > 0 ? (
            list
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((item) => renderRow(item, activeTab))
          ) : (
            <p className="text-center py-8 text-neutral-500">
              {t("noTransactions")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
