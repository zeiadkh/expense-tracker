import { useLayoutEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const { expenseId } = route.params || false;
  const isEditing = !!expenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );
  function deleteExpense() {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        subminButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues = {selectedExpense}
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
