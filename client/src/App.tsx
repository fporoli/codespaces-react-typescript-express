import "./App.css";

import { useState } from "react";
import { Expense } from "./models/Expense";
import { ExpenseList } from "./components/ExpenseList";
import ExpenseService from "./services/ExpenseService";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import { useExpenses } from "./hooks/useExpenses";

function App() {
  const { expenses, setExpenses, setError, isLoading, setIsLoading } =
    useExpenses();

  const [catFilter, setCatFilter] = useState<number>(-1);
  const [editExpenseId, setEditExpenseId] = useState<number>(-1);

  function refresh() {
    handleReset();
    setIsLoading(true);
    ExpenseService.getAll<Expense>()
      .request.then((exp) => {
        setIsLoading(false);
        setExpenses(exp.data);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  }

  function handleDeleteCS(expId: number) {
    ExpenseService.delete<Expense>(expId).then(() => {
      refresh();
    });
  }

  function handleEditCS(expId: number) {
    setEditExpenseId(expId);
  }

  function handleFilterSelectedCS(catId: number) {
    setCatFilter(catId);
  }

  function sendVisibleExpenses(): Expense[] | undefined {
    if (expenses) {
      return expenses.filter((x) => catFilter < 0 || x.category === catFilter);
    }
  }

  function handleSubmitCS(x: Expense) {
    if (x.id > 0) {
      ExpenseService.update<Expense>(x.id, x).then(() => {
        refresh();
      });
    } else {
      ExpenseService.create<Expense>(x).then(() => {
        refresh();
      });
    }
  }

  function handleResetServer() {
    ExpenseService.reset<Expense>().then(() => {
      refresh();
    });
  }

  function handleReset() {
    const newFilterId = catFilter > 0 ? -1 : catFilter - 1;
    setCatFilter(newFilterId);
    const newEditExpenseId = editExpenseId > 0 ? -1 : editExpenseId - 1;
    setEditExpenseId(newEditExpenseId);
  }

  return (
    <>
      <h1>Expense Manager</h1>
      <ExpenseForm
        expenseId={editExpenseId}
        handleSubmit={(x) => handleSubmitCS(x)}
        handleReset={() => handleReset()}
      />
      <ExpenseFilter
        handleFilterSelected={(x) => handleFilterSelectedCS(x)}
        filterChanged={catFilter}
      />
      <ExpenseList
        expenseList={sendVisibleExpenses()}
        isLoading={isLoading}
        handleDelete={(x) => handleDeleteCS(x)}
        handleEdit={(x) => handleEditCS(x)}
      />
      <button className="btn btn-danger" onClick={handleResetServer}>
        Reset Server
      </button>{" "}
    </>
  );
}

export default App;
