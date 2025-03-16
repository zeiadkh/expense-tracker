import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../../components/UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
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
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  function inputChangeHandler(inputIndentifier, enteredInput) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIndentifier]: { value: enteredInput, isValid: true },
      };
    });
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
        <Input
          style={{ flex: 1 }}
          label={"Date"}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
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
  }
});
