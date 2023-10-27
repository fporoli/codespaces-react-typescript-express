import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Expense, ExpenseCategories } from "../models/Expense";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpenseService from "../services/ExpenseService";

interface Props {
  expenseId: number;
  handleSubmit: (x: Expense) => void;
  handleReset: () => void;
}

const schema = z.object({
  description: z
    .string()
    .min(3, "Please provide at leeeeast 3 characters description."),
  amount: z
    .number()
    .min(0.01, "A value > 0 need to be provided.")
    .max(1000, "BIG amounts needs to be approved by manager.")
    .multipleOf(0.01),
  category: z.number().min(1),
});

type ExpenseValidationSchema = z.infer<typeof schema>;

function ExpenseForm(props: Props) {
  const [expense, setExpense] = useState<Expense | undefined>(undefined);

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ExpenseValidationSchema>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (expense) {
      clearErrors();
      setValue("description", expense.description);
      setValue("amount", expense.amount);
      setValue("category", expense.category);
    }
  }, [expense]);

  useEffect(() => {
    console.log("Props expId changed");
    if (props.expenseId > 0) {
      ExpenseService.get<Expense>(props.expenseId).then((x) =>
        setExpense(x.data)
      );
    } else {
      setExpense({
        id: -1,
        description: "",
        amount: 0,
        category: -1,
      } as Expense);
    }
  }, [props.expenseId]);

  return (
    <>
      <div>
        <h2>
          {props.expenseId < 0 && "New Expense"}
          {props.expenseId >= 0 && "Edit Expense"}
        </h2>
        <form
          className="form"
          onSubmit={handleSubmit((d) => {
            props.handleSubmit({ ...d, id: props.expenseId } as Expense);
          })}
        >
          <div className="">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="form-control"
              {...register("description")}
            />
            {errors.description && (
              <div className="alert alert-primary" role="alert">
                {errors.description.message}
              </div>
            )}
          </div>
          <div className="">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              autoComplete="off"
              id="amount"
              className="form-control"
              {...register("amount", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
            />
            {errors.amount && (
              <div className="alert alert-primary" role="alert">
                {errors.amount.message}
              </div>
            )}
          </div>
          <div className="">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              {...register("category", { valueAsNumber: true })}
            >
              {ExpenseCategories.map((x) => {
                return (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                );
              })}
            </select>
            {errors.category && (
              <div className="alert alert-primary" role="alert">
                {errors.category.message}
              </div>
            )}
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              {props.expenseId < 0 && "Submit New"}
              {props.expenseId >= 0 && "Submit Change"}
            </button>{" "}
            <button
              className="btn btn-info"
              onClick={() => props.handleReset()}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ExpenseForm;
