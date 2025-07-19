import type { FC } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
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

  const totalTimelineIncome = allMonths.reduce(
    (total, month) =>
      total +
      month.incomes.reduce(
        (monthTotal, income) => monthTotal + income.amount,
        0
      ),
    0
  );
  const totalTimelineExpense = allMonths.reduce(
    (total, month) =>
      total +
      month.expenses.reduce(
        (monthTotal, expense) => monthTotal + expense.amount,
        0
      ),
    0
  );

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

  const lineChartData = {
    labels: allMonths.map((m) => `${t("month")} ${m.name.split(" ")[1]}`),
    datasets: [
      {
        label: t("income"),
        data: allMonths.map((m) =>
          m.incomes.reduce((sum, i) => sum + i.amount, 0)
        ),
        borderColor: CHART_COLORS.income,
        backgroundColor: CHART_COLORS.incomeFill,
        fill: true,
        tension: 0.3,
      },
      {
        label: t("expense"),
        data: allMonths.map((m) =>
          m.expenses.reduce((sum, e) => sum + e.amount, 0)
        ),
        borderColor: CHART_COLORS.expense,
        backgroundColor: CHART_COLORS.expenseFill,
        fill: true,
        tension: 0.3,
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
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: t("incomeExpenseGrowth"),
        font: { size: 16 },
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
      <div className="card bg-base-200 shadow-xl">
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
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>
      <div className="card bg-base-200 shadow-xl xl:col-span-2">
        <div className="card-body">
          <Line data={lineChartData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};
