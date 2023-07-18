import { View, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import Input from "../ui/Input";
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";
import { AuthContext } from "../../context/auth/AuthProvider";
import { UserStatsContext } from "../../context/userStats/UserStatsProvider";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import { contentStyle } from "../../constants/styles/contentStyles";

export const LiftsForm = () => {
	const { user } = useContext(AuthContext);
	const { uploadStats, latestLift, fetchAllLifts } =
		useContext(UserStatsContext);

	const [enteredUserWeight, setUserWeight] = useState<string>("");
	const [enteredBenchWeight, setBenchWeight] = useState<string>("");
	const [enteredDeadliftWeight, setDeadliftWeight] = useState<string>("");
	const [enteredSquatWeight, setSquatWeight] = useState<string>("");

	useEffect(() => {
		if (latestLift) {
			setUserWeight(latestLift.userWeight.toString());
			setBenchWeight(latestLift.benchWeight.toString());
			setDeadliftWeight(latestLift.deadliftWeight.toString());
			setSquatWeight(latestLift.squatWeight.toString());
		}
	}, [latestLift]);

	function updateInputValueHandler(inputType: string, enteredValue: string) {
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
			userWeight: parseFloat(enteredUserWeight),
			benchWeight: parseFloat(enteredBenchWeight),
			deadliftWeight: parseFloat(enteredDeadliftWeight),
			squatWeight: parseFloat(enteredSquatWeight),
		});
		fetchAllLifts;
	}

	return (
		<View style={contentStyle.updateLiftsContent}>
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
