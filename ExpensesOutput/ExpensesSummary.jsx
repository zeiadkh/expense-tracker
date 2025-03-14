import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
export default function ExpensesSummary({periodName, expenses }) {
  console.log(expenses)
  const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontWeight: 'bold',
    fontSize: 16,
    color: GlobalStyles.colors.primary500
  }
});