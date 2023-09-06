import { Button, View, Text } from "react-native";
import { IKudos } from "../../../context/userStats/UserStatsTypes";
import { getDisplayName } from "../../friends/FriendStatusGetters";
import { useState, useEffect } from "react";

interface KudosViewProps {
	kudos: IKudos[]; // Replace with your kudos type
	goBack: () => void;
}

export const KudosElementView = ({ kudos, goBack }: KudosViewProps) => {
	const [displayNames, setDisplayNames] = useState<{ [key: string]: string }>(
		{},
	);

	const fetchKudosDisplayNames = async () => {
		const names: { [key: string]: string } = {};
		for (const kudosObject of kudos) {
			names[kudosObject.friendID] = await getDisplayName(kudosObject.friendID);			
		}
		setDisplayNames(names);
	};

	useEffect(() => {
		fetchKudosDisplayNames();
	}, [kudos]);

	return (
		<View>
			{kudos.map((kudosObject) => (
				<Text key={kudosObject.friendID}>{displayNames[kudosObject.friendID]}</Text>
			))}
			<Button title="Go back" onPress={goBack} />
		</View>
	);
};
