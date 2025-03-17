import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
export default function RecentExpenses() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    getExpenses();
  }, []);
  async function errorHandler() {
    setError(null);
    try {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }
  if (error && !loading)
    return (
      <ErrorOverlay
        msg={error}
        onConfirm={errorHandler}
      />
    );
  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <ExpensesOutput
          expensesPeriod={"Last 7 Days"}
          expneses={recentExpenses}
          fallbackText={"No expenses registered for the last 7 days."}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({});
