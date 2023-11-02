import { Expense, ExpenseCategoryName } from "../models/Expense";

interface Props {
  expenseList: Expense[] | undefined;
  isLoading: boolean;
  handleDelete: (xId: number) => void;
  handleEdit: (xId: number) => void;
}

export function ExpenseList(props: Props) {
  return (
    <>
      <div className="mt-3">
        <h2>
          ExpenseList
          {props.isLoading && ".... Loading"}
        </h2>
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr className="table-active">
              <td>Description</td>
              <td>Category</td>
              <td>Amount</td>
              <td width="200"></td>
            </tr>
          </thead>
          <tbody>
            {props.expenseList?.map((x) => (
              <tr key={x.id}>
                <td>{x.description}</td>
                <td>{ExpenseCategoryName(x.category)}</td>
                <td>{x.amount}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    key="{D+x.id}"
                    onClick={() => props.handleDelete(x.id)}
                  >
                    Delete
                  </button>{" "}
                  <button
                    className="btn btn-success"
                    key="{E+x.id}"
                    onClick={() => props.handleEdit(x.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="table-warning">
              <td>Total</td>
              <td></td>
              <td>
                $ {props.expenseList?.reduce((e, t) => (t.amount ?? 0) + e, 0)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
