import { useState, useEffect } from "react";
import type { Month, Income, Expense } from "../types/type";

export const useBudgetData = () => {
  const [months, setMonths] = useState<Month[]>(() => {
    try {
      const savedData = localStorage.getItem("monthlyBudDataV2");
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("monthlyBudDataV2", JSON.stringify(months));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [months]);

  const addMonth = () => {
    setMonths((prev) => {
      const newMonthName = `Month ${prev.length + 1}`;
      const newMonth: Month = {
        id: crypto.randomUUID(),
        name: newMonthName,
        incomes: [],
        expenses: [],
      };
      return [...prev, newMonth];
    });
  };

  const addTransaction = (
    monthId: string,
    type: "income" | "expense",
    details: Omit<Income, "id"> | Omit<Expense, "id">
  ) => {
    setMonths((prev) =>
      prev.map((month) => {
        if (month.id === monthId) {
          const newTransaction = { id: crypto.randomUUID(), ...details };
          if (type === "income") {
            return {
              ...month,
              incomes: [...month.incomes, newTransaction as Income],
            };
          } else {
            return {
              ...month,
              expenses: [...month.expenses, newTransaction as Expense],
            };
          }
        }
        return month;
      })
    );
  };

  return { months, addMonth, addTransaction };
};
