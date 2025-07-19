import type { FC } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { useLanguage } from "../context/useLanguage";
import { CHART_COLORS } from "../types/constants";
import type { Month, Category } from "../types/type";

interface TimelineChartsProps {
  allMonths: Month[];
}

export const TimelineCharts: FC<TimelineChartsProps> = ({ allMonths }) => {
  const { t } = useLanguage();
  if (!allMonths || allMonths.length === 0)
    return <div className="text-center py-10">{t("noDataTimeline")}</div>;

  const totalExpensesByCategory = allMonths
    .flatMap((month) => month.expenses)
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<Category, number>);

  const pieChartData = {
    labels: Object.keys(totalExpensesByCategory).map((cat) => t(cat)),
    datasets: [
      {
        data: Object.values(totalExpensesByCategory),
        backgroundColor: CHART_COLORS.pie,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const totalTimelineIncome = allMonths.reduce((total, month) => {
    return (
      total +
      month.incomes.reduce(
        (monthTotal, income) => monthTotal + income.amount,
        0
      )
    );
  }, 0);

  const totalTimelineExpense = allMonths.reduce((total, month) => {
    return (
      total +
      month.expenses.reduce(
        (monthTotal, expense) => monthTotal + expense.amount,
        0
      )
    );
  }, 0);

  const barChartData = {
    labels: [t("totalIncomeExpenseTitle")],
    datasets: [
      {
        label: t("income"),
        data: [totalTimelineIncome],
        backgroundColor: CHART_COLORS.income,
      },
      {
        label: t("expense"),
        data: [totalTimelineExpense],
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
        text: t("totalExpensesTitle"),
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
        text: t("totalIncomeExpenseTitle"),
        font: { size: 16 },
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="card bg-white shadow-xl">
        <div className="card-body">
          {Object.keys(totalExpensesByCategory).length > 0 ? (
            <Pie data={pieChartData} options={pieOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              {t("noDataTimeline")}
            </div>
          )}
        </div>
      </div>
      <div className="card bg-white shadow-xl">
        <div className="card-body">
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};
