import { useState, useEffect } from "react";
import type { Month, Income, Expense } from "../types/type";

const getInitialData = (): Month[] => {
  const months: Month[] = [];
  const currentYear = new Date().getFullYear() - 1;
  for (let i = 0; i < 12; i++) {
    // const monthDate = new Date(currentYear, i, 1);
    const monthString = (i + 1).toString().padStart(2, "0");

    const incomeAmount = 4800 + Math.random() * 800;
    const rent = 1500;
    const food = 400 + Math.random() * 200;
    const transport = 100 + Math.random() * 100;
    const entertainment = 150 + Math.random() * 200;
    const other = 50 + Math.random() * 150;

    months.push({
      id: `month-${i + 1}`,
      name: `Month ${i + 1}`,
      incomes: [
        {
          id: `inc-${i + 1}`,
          amount: parseFloat(incomeAmount.toFixed(2)),
          date: `${currentYear}-${monthString}-01`,
        },
      ],
      expenses: [
        {
          id: `exp-${i + 1}-1`,
          amount: rent,
          date: `${currentYear}-${monthString}-01`,
          category: "Rent",
        },
        {
          id: `exp-${i + 1}-2`,
          amount: parseFloat(food.toFixed(2)),
          date: `${currentYear}-${monthString}-05`,
          category: "Food",
        },
        {
          id: `exp-${i + 1}-3`,
          amount: parseFloat(transport.toFixed(2)),
          date: `${currentYear}-${monthString}-10`,
          category: "Transportation",
        },
        {
          id: `exp-${i + 1}-4`,
          amount: parseFloat(entertainment.toFixed(2)),
          date: `${currentYear}-${monthString}-15`,
          category: "Entertainment",
        },
        {
          id: `exp-${i + 1}-5`,
          amount: parseFloat(other.toFixed(2)),
          date: `${currentYear}-${monthString}-20`,
          category: "Other",
        },
      ],
    });
  }
  return months;
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
