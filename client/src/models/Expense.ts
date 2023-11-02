export interface Expense {
  id: number;
  description: string;
  category: number;
  amount: number;
}

export interface ExpenseCategory {
  id: number;
  name: string;
}

export const ExpenseCategories: ExpenseCategory[] = [
  { id: 11, name: "Entertainment" },
  { id: 22, name: "Groceries" },
  { id: 33, name: "Utilities" },
];

export function ExpenseCategoryName(categoryId: number) {
  const idx = ExpenseCategories.findIndex((x) => x.id === categoryId);
  if (idx >= 0) {
    return ExpenseCategories[idx].name;
  }
  return "";
}
