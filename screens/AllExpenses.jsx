import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput expensesPeriod={"Total"} expneses={expensesCtx.expenses} fallbackText={"No expenses registered."} />
  );
}
