export type Category =
  | "Rent"
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Other";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
}

export interface Expense extends Transaction {
  category: Category;
}

export interface Income extends Transaction {}

export interface Month {
  id: string;
  name: string;
  incomes: Income[];
  expenses: Expense[];
}

export interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
  t: (key: string) => string;
}

export const CATEGORIES: Category[] = [
  "Rent",
  "Food",
  "Transportation",
  "Entertainment",
  "Other",
];
export const CHART_COLORS = {
  income: "rgba(34, 197, 94, 0.7)",
  expense: "rgba(239, 68, 68, 0.7)",
  pie: ["#ef4444", "#3b82f6", "#eab308", "#22c55e", "#8b5cf6"],
};
