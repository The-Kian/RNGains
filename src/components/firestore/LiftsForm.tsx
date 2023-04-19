import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../ui/Input";
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";
import { AuthContext } from "../auth/AuthProvider";
import { UserStatsContext } from "./UserStatsProvider";


export type liftStatsType = {
  userWeight: number
  squatWeight: number,
  deadliftWeight: number,
  benchWeight: number
}

export type LiftsFormProps = {
  //onSubmit: (liftStats: liftStatsType) => void
};

export const LiftsForm: React.FC<LiftsFormProps> = ({}) => {
    const [enteredUserWeight, setUserWeight] = useState<string>('');
    const [enteredBenchWeight, setBenchWeight] = useState<string>('');
    const [enteredDeadliftWeight, setDeadliftWeight] = useState<string>('');
    const [enteredSquatWeight, setSquatWeight] = useState<string>('');

    const {user} = useContext(AuthContext)
    const {uploadStats} = useContext(UserStatsContext)

    function updateInputValueHandler(inputType: string, enteredValue: string) {
      const enteredNumber = parseInt(enteredValue)
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
      uploadStats({
        userID: user.uid,
        userWeight: parseInt(enteredUserWeight),
        benchWeight: parseInt(enteredBenchWeight),
        deadliftWeight: parseInt(enteredDeadliftWeight),
        squatWeight: parseInt(enteredSquatWeight),
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