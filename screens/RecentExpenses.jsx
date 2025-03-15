import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput expensesPeriod={"Last 7 Days"} expneses={recentExpenses} fallbackText={"No expenses registered for the last 7 days."} />
  );
}
const styles = StyleSheet.create({});
