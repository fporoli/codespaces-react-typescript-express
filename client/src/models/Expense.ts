export interface Expense {
    id: number,
    description: string,
    category: number,
    amount: number
}

export interface ExpenseCategory {
    id: number,
    name: string
}

export const ExpenseCategories: ExpenseCategory[] = [
    { id: 11, name: 'Entertainment' },
    { id: 22, name: 'Groceries' },
    { id: 33, name: 'Utilities' },
]

export function ExpenseCategoryName(categoryId: number) {
    const idx = ExpenseCategories.findIndex(x => x.id === categoryId);
    if (idx >= 0) {
        return ExpenseCategories[idx].name;
    }
    return "";
}

export const DemoExpenses: Expense[] = [
    { id: 1, description: 'Test Data 1', category: 11, amount: 10 },
    { id: 2, description: 'Test Data 2', category: 22, amount: 20 },
    { id: 3, description: 'Test Data 3', category: 33, amount: 30 },
    { id: 4, description: 'Test Data 4', category: 22, amount: 40 },
];
