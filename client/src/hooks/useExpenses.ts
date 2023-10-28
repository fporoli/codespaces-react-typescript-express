import { useEffect, useState } from "react";
import { Expense } from "../models/Expense";
import ExpenseService from "../services/ExpenseService";
import { CanceledError } from "../services/ApiClient";
import axios from "axios";

interface FetchExpensesResponse {
  count: number;
  expenses: Expense[];
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    const { request, cancel } = ExpenseService.getAll<FetchExpensesResponse>(
      {}
    );
    request
      .then((exp) => {
        setExpenses(exp.data.expenses);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (e instanceof CanceledError) {
          console.log("Cancelled");
          return;
        } else if (axios.isAxiosError(e)) {
          setError(e.status + ": " + e.message);
        } else {
          setError(e.message);
        }
      });
    return () => cancel();
  }, []);

  return { expenses, error, isLoading, setExpenses, setError, setIsLoading };
}
