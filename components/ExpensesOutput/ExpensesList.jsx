import { FlatList, Text, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";
function renderExpenseItem(itemData){
    return <ExpenseItem {...itemData.item} />
}
export default function ExpensesList({expenses}){
    return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id }/>
}
const styles = StyleSheet.create({})