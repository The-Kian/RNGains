import { Text, View } from "react-native";
import { contentStyle } from "../../../constants/styles/contentStyles";
import { IFriendsLifts } from "../../../constants/types/friend";
import { Lift } from "../../../context/userStats/UserStatsTypes";

interface LiftHistoryProps {
	item: Lift | IFriendsLifts;
	friendID?: string;
	displayName?: string;
}

export const liftsDisplayList = ({ item, friendID, displayName }: LiftHistoryProps) => {
	if (friendID) {
		const friendLifts = (item as IFriendsLifts).lifts;
		return (
			<View>
				{friendLifts.map((lift, index) => (
					<View key={index} style={contentStyle.liftContent}>
						<Text>{`Display name: ${displayName}`}</Text>
						<Text>{`User Weight: ${lift.userWeight}`}</Text>
						<Text>{`Squat: ${lift.squatWeight}`}</Text>
						<Text>{`Deadlift: ${lift.deadliftWeight}`}</Text>
						<Text>{`Bench: ${lift.benchWeight}`}</Text>
						<Text>{`Time: ${lift.timestamp?.toDate().toLocaleString()}`}</Text>
					</View>
				))}
			</View>
		);
	} else {
		const userLift = item as Lift;
		return (
			<View style={contentStyle.liftContent}>
				<Text>{`User Weight: ${userLift.userWeight}`}</Text>
				<Text>{`Squat: ${userLift.squatWeight}`}</Text>
				<Text>{`Deadlift: ${userLift.deadliftWeight}`}</Text>
				<Text>{`Bench: ${userLift.benchWeight}`}</Text>
				<Text>{`Time: ${userLift.timestamp?.toDate().toLocaleString()}`}</Text>
			</View>
		);
	}
};
