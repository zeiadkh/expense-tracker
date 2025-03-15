import { View, StyleSheet, Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ expneses, expensesPeriod, fallbackText }) {
  let content = <Text style = {styles.infoText}>{fallbackText}</Text>
  if (expneses.length > 0){
    content = <ExpensesList expenses= {expneses}/>
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expneses}/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});
