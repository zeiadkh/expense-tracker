import {Text, StyleSheet} from "react-native"
import ExpensesOutput from "../ExpensesOutput/ExpensesOutput"
export default function RecentExpenses(){
    return <ExpensesOutput expensesPeriod={"Last 7 Days"} />
}
const styles = StyleSheet.create({})