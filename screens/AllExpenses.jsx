import { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput expensesPeriod={"Total"} expneses={expensesCtx.expenses} />
  );
}
const styles = StyleSheet.create({});
