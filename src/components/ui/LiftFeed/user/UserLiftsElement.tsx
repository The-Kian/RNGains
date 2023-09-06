import React from "react";
import { View, Text } from "react-native";
import { contentStyle } from "../../../../constants/styles/contentStyles";
import { Lift } from "../../../../context/userStats/UserStatsTypes";

interface UserLiftsProps {
	lift: Lift;
}

const UserLiftsElement = ({ lift }: UserLiftsProps) => {
	return (
		<View style={contentStyle.liftContent}>
			<Text>{`User Weight: ${lift.userWeight}`}</Text>
			<Text>{`Squat: ${lift.squatWeight}`}</Text>
			<Text>{`Deadlift: ${lift.deadliftWeight}`}</Text>
			<Text>{`Bench: ${lift.benchWeight}`}</Text>
			<Text>{`Time: ${lift.timestamp?.toDate().toLocaleString()}`}</Text>
		</View>
	);
};

export default UserLiftsElement;
