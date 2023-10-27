import Expense from "./expense";

const DemoExpenses: Expense[] = [
    { id: 21, description: "Test Data 1", category: 11, amount: 10 },
    { id: 32, description: "Test Data 2", category: 22, amount: 20 },
    { id: 43, description: "Test Data 3", category: 33, amount: 30 },
    { id: 54, description: "Test Data 4", category: 22, amount: 40 },
];

let expenses: Expense[] = [...DemoExpenses];

export function getExpenses(): Expense[] {
    return expenses;
}

export function find(id: number) {
    return expenses.find((x) => x.id == id);
}

function findFreeId(): number {
    return Math.max(...expenses.map(o => o.id)) + 1;
}

export function create(newExpense: Expense): Expense {
    const idx = expenses.length;
    const key = findFreeId();
    expenses[idx] = {
        ...newExpense,
        id: key,
    };
    return expenses[idx];
}

export function update(id: number,
    expenseUpdate: Expense): Expense {
    const idx = expenses.findIndex((x) => x.id === id);
    expenses[idx] = { ...expenseUpdate };
    return expenses[idx];
}

export function remove(id: number): void {
    expenses = expenses.filter((e) => e.id !== id);
}

export function reset(): void {
    expenses = [...DemoExpenses];
}