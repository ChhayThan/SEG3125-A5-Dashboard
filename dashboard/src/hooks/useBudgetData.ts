import { useState, useEffect } from "react";
import type { Month, Income, Expense } from "../types/type";

const getInitialData = (): Month[] => {
  return [
    {
      id: "month-1",
      name: "Month 1",
      incomes: [{ id: "inc-1", amount: 5000, date: "2025-05-01" }],
      expenses: [
        { id: "exp-1", amount: 1500, date: "2025-05-01", category: "Rent" },
        { id: "exp-2", amount: 450, date: "2025-05-05", category: "Food" },
        {
          id: "exp-3",
          amount: 120,
          date: "2025-05-10",
          category: "Transportation",
        },
        {
          id: "exp-4",
          amount: 250,
          date: "2025-05-15",
          category: "Entertainment",
        },
        { id: "exp-5", amount: 80, date: "2025-05-20", category: "Other" },
      ],
    },
    {
      id: "month-2",
      name: "Month 2",
      incomes: [{ id: "inc-2", amount: 5200, date: "2025-06-01" }],
      expenses: [
        { id: "exp-6", amount: 1500, date: "2025-06-01", category: "Rent" },
        { id: "exp-7", amount: 500, date: "2025-06-06", category: "Food" },
        {
          id: "exp-8",
          amount: 150,
          date: "2025-06-11",
          category: "Transportation",
        },
        {
          id: "exp-9",
          amount: 180,
          date: "2025-06-16",
          category: "Entertainment",
        },
      ],
    },
    {
      id: "month-3",
      name: "Month 3",
      incomes: [{ id: "inc-3", amount: 4800, date: "2025-07-01" }],
      expenses: [
        { id: "exp-10", amount: 1500, date: "2025-07-01", category: "Rent" },
        { id: "exp-11", amount: 400, date: "2025-07-07", category: "Food" },
        { id: "exp-12", amount: 300, date: "2025-07-12", category: "Other" },
        {
          id: "exp-13",
          amount: 300,
          date: "2025-07-18",
          category: "Entertainment",
        },
      ],
    },
  ];
};

export const useBudgetData = () => {
  const [months, setMonths] = useState<Month[]>(() => {
    try {
      const savedData = localStorage.getItem("monthlyBudDataV2");
      return savedData ? JSON.parse(savedData) : getInitialData();
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

  const addMonth = (): string => {
    const newMonthName = `Month ${months.length + 1}`;
    const newMonth: Month = {
      id: crypto.randomUUID(),
      name: newMonthName,
      incomes: [],
      expenses: [],
    };
    setMonths((prev) => [...prev, newMonth]);
    return newMonth.id;
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

  const removeTransaction = (
    monthId: string,
    transactionId: string,
    type: "income" | "expense"
  ) => {
    setMonths((prev) =>
      prev.map((month) => {
        if (month.id === monthId) {
          if (type === "income") {
            return {
              ...month,
              incomes: month.incomes.filter((inc) => inc.id !== transactionId),
            };
          } else {
            return {
              ...month,
              expenses: month.expenses.filter(
                (exp) => exp.id !== transactionId
              ),
            };
          }
        }
        return month;
      })
    );
  };

  return { months, addMonth, addTransaction, removeTransaction };
};
