import { useState } from "react";
import { View, Text, StyleSheet, Alert, Platform, Pressable } from "react-native";
import Input from "./Input";
import Button from "../../components/UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function ExpenseForm({
  onSubmit,
  onCancel,
  subminButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date : new Date(),
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);

  function inputChangeHandler(inputIndentifier, enteredInput) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIndentifier]: { value: enteredInput, isValid: true },
      };
    });
  }

  function dateChangeHandler(selectedDate) {
    setShowDatePicker(false);
    if (selectedDate) {
      // Fix timezone issue by setting time to noon
      const adjustedDate = new Date(selectedDate);
      adjustedDate.setHours(12, 0, 0, 0);
      
      setInputs((currentInputs) => {
        return {
          ...currentInputs,
          date: { value: adjustedDate, isValid: true },
        };
      });
    }
  }

  function showDatePickerHandler() {
    setShowDatePicker(true);
  }
  function hideDatePicker() {
    setShowDatePicker(false);
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      //   Alert.alert("Invalid input", "Please check your Input values");
      return;
    }

    onSubmit(expenseData);
  }
  const fromIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRaw}>
        <Input
          style={{ flex: 1 }}
          invalid={!inputs.amount.isValid}
          label={"Amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
       <View style={[styles.dateContainer, { flex: 1 }]}>
          <Text style={[styles.label, !inputs.date.isValid && styles.invalidLabel]}>Date</Text>
          <Pressable onPress={showDatePickerHandler}>
            <View style={[styles.dateButton, !inputs.date.isValid && styles.invalidInput]}>
              <Text style={styles.dateText}>
                {getFormattedDate(inputs.date.value)}
              </Text>
            </View>
          </Pressable>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={dateChangeHandler}
            onCancel={hideDatePicker}
            date={inputs.date.value}
          />
        </View>
      </View>
      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {fromIsInvalid && (
        <Text style={styles.errorText}>Invalid input Please check your Input values</Text>
      )}
      <View style={styles.btnsContainer}>
        <Button mode={"flat"} onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {subminButtonLabel}
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRaw: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 24,
  },
  errorText:{
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  dateContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  dateButton: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    minHeight: 36,
    justifyContent: 'center',
  },
  dateText: {
    color: GlobalStyles.colors.primary700,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});