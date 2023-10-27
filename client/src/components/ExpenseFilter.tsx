import { ExpenseCategories } from "../models/Expense";

interface Props {
  handleFilterSelected(categoryId: number): void;
  filterChanged: number;
}

function ExpenseFilter(props: Props) {
  return (
    <>
      <div className="mt-3">ExpenseFilter</div>
      <select
        className="form-select"
        onChange={(x) => {
          props.handleFilterSelected(parseInt(x.target.value));
        }}
        value={props.filterChanged}
      >
        <option value="-1" key="-1">
          All
        </option>
        {ExpenseCategories.map((x) => {
          return (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default ExpenseFilter;
