import { Button, Text, View } from "react-native";
import { contentStyle } from "../../../constants/styles/contentStyles";
import { IFriendsLifts } from "../../../constants/types/friend";
import { Lift } from "../../../context/userStats/UserStatsTypes";
import { giveKudos } from "../../friends/FriendsFeedQueries";
import { useState } from "react";

interface LiftHistoryProps {
	item: Lift | IFriendsLifts;
	friendID?: string;
	displayName?: string;
}

export const LiftDisplayList = ({
	item,
	friendID,
	displayName,
}: LiftHistoryProps) => {
	const [viewKudos, setViewKudos] = useState<string | null>(null);
	const kudosHandler = (friendID: string, liftID: string) => {
		console.log(
			"🚀 ~ file: LiftHistoryList.tsx:16 ~ kudosHandler ~ kudosHandler:",
			kudosHandler,
		);
		giveKudos(friendID, liftID);
	};

	if (friendID) {
		// if item is a friendsLift
		const friendLifts = (item as IFriendsLifts).lifts;
		return (
			<View>
				{friendLifts.map((lift) => (
					<View key={lift.id} style={contentStyle.liftContent}>
						{viewKudos === lift.id ? (
							<View>
								<Text>Kudos</Text>
								<Button
									title={`Go back`}
									onPress={() => {
										setViewKudos(null);
										console.log(
											"🚀 ~ file: LiftDisplayList.tsx:45 ~ viewKudos:",
											viewKudos,
										);
									}}
								/>
							</View>
						) : (
							<>
								<Text>{`Display name: ${displayName}`}</Text>
								<Text>{`User Weight: ${lift.userWeight}`}</Text>
								<Text>{`Squat: ${lift.squatWeight}`}</Text>
								<Text>{`Deadlift: ${lift.deadliftWeight}`}</Text>
								<Text>{`Bench: ${lift.benchWeight}`}</Text>
								<Text>{`Time: ${lift.timestamp?.toDate().toLocaleString()}`}</Text>
								<Button
									title={`${lift.kudos?.length || 0}`}
									onPress={() => {
										setViewKudos(lift.id);
										console.log(
											"🚀 ~ file: LiftDisplayList.tsx:45 ~ viewKudos:",
											viewKudos,
										);
									}}
								/>
								<Button title="Kudos" onPress={() => kudosHandler(friendID, lift.id)} />
							</>
						)}
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
