import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e2",
    description: "A pair of Trousers",
    amount: 89.29,
    date: new Date("2025-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2025-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.25,
    date: new Date("2025-03-13"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload.reverse();
    case "ADD":
      return [ action.payload , ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatebleExpense = state[updatableExpenseIndex];
      const updatedData = { ...updatebleExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedData;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }
  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense: deleteExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
