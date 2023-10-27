"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.remove = exports.update = exports.create = exports.find = exports.getExpenses = void 0;
const DemoExpenses = [
    { id: 21, description: "Test Data 1", category: 11, amount: 10 },
    { id: 32, description: "Test Data 2", category: 22, amount: 20 },
    { id: 43, description: "Test Data 3", category: 33, amount: 30 },
    { id: 54, description: "Test Data 4", category: 22, amount: 40 },
];
let expenses = [...DemoExpenses];
function getExpenses() {
    return expenses;
}
exports.getExpenses = getExpenses;
function find(id) {
    return expenses.find((x) => x.id == id);
}
exports.find = find;
function findFreeId() {
    return Math.max(...expenses.map(o => o.id)) + 1;
}
function create(newExpense) {
    const idx = expenses.length;
    const key = findFreeId();
    expenses[idx] = Object.assign(Object.assign({}, newExpense), { id: key });
    return expenses[idx];
}
exports.create = create;
function update(id, expenseUpdate) {
    const idx = expenses.findIndex((x) => x.id === id);
    expenses[idx] = Object.assign({}, expenseUpdate);
    return expenses[idx];
}
exports.update = update;
function remove(id) {
    expenses = expenses.filter((e) => e.id !== id);
}
exports.remove = remove;
function reset() {
    expenses = [...DemoExpenses];
}
exports.reset = reset;
