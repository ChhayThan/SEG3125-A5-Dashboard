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

export type Income = Transaction;

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
