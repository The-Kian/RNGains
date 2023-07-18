import { Text, View } from "react-native";

import { Lift } from "../../userStats/UserStatsTypes";
import { contentStyle } from "../../../constants/styles/contentStyles";

export const liftHistoryList = ({ item }: { item: Lift }) => {
	return (
		<View style={contentStyle.liftContent}>
			<Text>{`User Weight: ${item.userWeight}`}</Text>
			<Text>{`Squat: ${item.squatWeight}`}</Text>
			<Text>{`Deadlift: ${item.deadliftWeight}`}</Text>
			<Text>{`Bench: ${item.benchWeight}`}</Text>
			<Text>{`Time: ${item.timestamp?.toDate().toLocaleString()}`}</Text>
		</View>
	)
}
