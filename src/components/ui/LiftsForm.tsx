import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { Colors } from "../../constants/colors";
import Button from "./Button";


export type liftStatsType = {
  userWeight: number
  squatWeight: number,
  deadliftWeight: number,
  benchWeight: number
}

export type LiftsFormProps = {
  onSubmit: (liftStats: liftStatsType) => void
};

export const LiftsForm: React.FC<LiftsFormProps> = ({onSubmit}) => {
    const [enteredUserWeight, setUserWeight] = useState<number>(0);
    const [enteredBenchWeight, setBenchWeight] = useState<number>(0);
    const [enteredDeadliftWeight, setDeadliftWeight] = useState<number>(0);
    const [enteredSquatWeight, setSquatWeight] = useState<number>(0);

    function updateInputValueHandler(inputType: string, enteredValue: number) {
    switch (inputType) {
      case "weight":
        setUserWeight(enteredValue);
        break;
      case "bench":
        setBenchWeight(enteredValue);
        break;
      case "deadlift":
        setDeadliftWeight(enteredValue);
        break;
      case "squat":
        setSquatWeight(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      userWeight: enteredUserWeight,
      benchWeight: enteredBenchWeight,
      deadliftWeight: enteredDeadliftWeight,
      squatWeight: enteredSquatWeight,
    });
  }

  return (
    <View style={styles.updateLiftsContent}>
      <Input 
        label="Weight (kg)"
        keyboardType="number-pad"
        onUpdateValue={updateInputValueHandler.bind(this, "weight")}
        value={enteredUserWeight}
        isInvalid={false}
      />
      <Input
        label="Bench (kg)"
        keyboardType="number-pad"
        onUpdateValue={updateInputValueHandler.bind(this, "bench")}
        value={enteredBenchWeight}
        isInvalid={false}
      />
      <Input
        label="Deadlift (kg)"
        keyboardType="number-pad"
        onUpdateValue={updateInputValueHandler.bind(this, "deadlift")}
        value={enteredDeadliftWeight}
        isInvalid={false}
      />
      <Input
        label="Squat (kg)"
        keyboardType="number-pad"
        onUpdateValue={updateInputValueHandler.bind(this, "squat")}
        value={enteredSquatWeight}
        isInvalid={false}
      />
      <Button onPress={submitHandler}>Submit</Button>
           </View>
  );
};

const styles = StyleSheet.create({
  updateLiftsContent: {
    marginHorizontal: 2,
    padding: 64,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    backgroundColor: Colors.primaryDark
  },
  buttons: {
    marginTop: 8,
  },
});