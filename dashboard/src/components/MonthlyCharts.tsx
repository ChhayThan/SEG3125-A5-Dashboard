import type { FC } from "react";
import { useLanguage } from "../context/LanguageContext";
import { CHART_COLORS } from "../types/constants";
import type { Month } from "../types/type";
import { Pie, Bar } from "react-chartjs-2";

interface MonthlyChartsProps {
  monthData: Month;
}

export const MonthlyCharts: FC<MonthlyChartsProps> = ({ monthData }) => {
  const { t } = useLanguage();
  const totalIncome = monthData.incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = monthData.expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  if (totalIncome === 0 && totalExpenses === 0)
    return <div className="text-center py-10">{t("noData")}</div>;

  const pieChartData = {
    labels: monthData.expenses.map((e) => t(e.category)),
    datasets: [
      {
        data: monthData.expenses.map((e) => e.amount),
        backgroundColor: CHART_COLORS.pie,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };
  const barChartData = {
    labels: [monthData.name],
    datasets: [
      {
        label: t("income"),
        data: [totalIncome],
        backgroundColor: CHART_COLORS.income,
      },
      {
        label: t("expense"),
        data: [totalExpenses],
        backgroundColor: CHART_COLORS.expense,
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: t("monthlyExpensesTitle"),
        font: { size: 16 },
      },
    },
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: t("monthlyIncomeExpenseTitle"),
        font: { size: 16 },
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          {totalExpenses > 0 ? (
            <Pie data={pieChartData} options={pieOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              {t("noData")}
            </div>
          )}
        </div>
      </div>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};
