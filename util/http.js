import axios from "axios";

const BACKEND_URL =
  "https://expense-tracker-3110-default-rtdb.europe-west1.firebasedatabase.app";
export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const expenseId = response.data.name;
  return expenseId;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  const response = axios.patch(
    BACKEND_URL + `/expenses/${id}.json`,
    expenseData
  );
  return response;
}

export function removeExpense(id) {
    const response = axios.delete(BACKEND_URL + `/expenses/${id}.json`);
  return response;
}
