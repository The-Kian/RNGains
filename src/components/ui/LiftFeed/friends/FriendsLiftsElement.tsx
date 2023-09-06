import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native";
import { contentStyle } from "../../../../constants/styles/contentStyles";
import { Lift } from "../../../../context/userStats/UserStatsTypes";
import { giveKudos } from "../../../friends/FriendsFeedQueries";
import { KudosElementView } from "../KudosElement";
import { AuthContext } from "../../../../context/auth/AuthProvider";

interface FriendLiftsProps {
	lifts: Lift[];
	friendID: string;
	displayName: string;
}

const FriendsLiftsElement: React.FC<FriendLiftsProps> = ({
	lifts,
	friendID,
	displayName,
}) => {
	const [viewKudos, setViewKudos] = useState<string | null>(null);
	const { user } = useContext(AuthContext);
	const userID = user?.uid;

	const kudosHandler = async (liftID: string) => {
		try {
		  await giveKudos(friendID, liftID, userID);
		} catch (error) {
		  console.error('An error occurred:', error);
		}
	  };

	return (
		<View>
			{lifts.map((lift) => (
				<View key={lift.id} style={contentStyle.liftContent}>
					{viewKudos === lift.id && lift.kudos ? (
						<KudosElementView kudos={lift.kudos} goBack={() => setViewKudos(null)} />
					) : (
						<View>
							<Text>{`Display name: ${displayName}`}</Text>
							<Text>{`User Weight: ${lift.userWeight}`}</Text>
							<Text>{`Squat: ${lift.squatWeight}`}</Text>
							<Text>{`Deadlift: ${lift.deadliftWeight}`}</Text>
							<Text>{`Bench: ${lift.benchWeight}`}</Text>
							<Text>{`Time: ${lift.timestamp?.toDate().toLocaleString()}`}</Text>
							<Button
								title={`${lift.kudos?.length || 0}`}
								onPress={() => setViewKudos(lift.id)}
							/>
							<Button title="Kudos" onPress={() => kudosHandler(lift.id)} />
						</View>
					)}
				</View>
			))}
		</View>
	);
};

export default FriendsLiftsElement;
