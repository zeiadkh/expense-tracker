import axios from "axios";
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL =
  "https://expense-tracker-3110-default-rtdb.europe-west1.firebasedatabase.app";

// Get a unique identifier for the device/user
async function getUserId() {
  let userId = await AsyncStorage.getItem('userId');
  
  if (!userId) {
    // Create a new user ID if none exists
    userId = Device.deviceName + '-' + Date.now().toString();
    await AsyncStorage.setItem('userId', userId);
  }
  
  return userId;
}

export async function storeExpense(expenseData) {
  const userId = await getUserId();
  const response = await axios.post(
    `${BACKEND_URL}/users/${userId}/expenses.json`,
    expenseData
  );
  const expenseId = response.data.name;
  return expenseId;
}

export async function fetchExpenses() {
  const userId = await getUserId();
  const response = await axios.get(`${BACKEND_URL}/users/${userId}/expenses.json`);
  
  const expenses = [];
  if (response.data) {
    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
  }
  return expenses;
}

export async function updateExpense(id, expenseData) {
  const userId = await getUserId();
  const response = axios.patch(
    `${BACKEND_URL}/users/${userId}/expenses/${id}.json`,
    expenseData
  );
  return response;
}

export async function removeExpense(id) {
  const userId = await getUserId();
  const response = axios.delete(
    `${BACKEND_URL}/users/${userId}/expenses/${id}.json`
  );
  return response;
}