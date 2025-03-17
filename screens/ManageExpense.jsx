import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, removeExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
export default function ManageExpense({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const { expenseId } = route.params || false;
  const isEditing = !!expenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );
  async function deleteExpense() {
    try {
      setLoading(true);
      await removeExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Couldn't delete this expense - try again later");
      setLoading(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setLoading(true);
    if (isEditing) {
      try {
        await updateExpense(expenseId, expenseData);
        expensesCtx.updateExpense(expenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        setError("Couldn't update expense - please try again later!");
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        setError("Couldn't add expense - try again later");
      }
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);
  if (error && !loading)
    return <ErrorOverlay msg={error} onConfirm={() => setError(null)} />;
  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <View style={styles.container}>
          <ExpenseForm
            onCancel={cancelHandler}
            subminButtonLabel={isEditing ? "Update" : "Add"}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense}
          />

          {isEditing && (
            <View style={styles.deleteExpenseContainer}>
              <IconButton
                icon={"trash"}
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpense}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteExpenseContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
