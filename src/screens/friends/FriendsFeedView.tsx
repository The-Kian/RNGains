import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../../context/auth/AuthProvider";
import { getCurrentFriends } from "../../components/friends/FriendStatusGetters";

import { UserStatsContext } from "../../context/userStats/UserStatsProvider";

import { liftHistoryList } from "../../components/ui/LiftHistory/LiftHistoryList";
import { ScreenStyle } from "../../constants/styles/screenStyles";

function FriendsFeedView() {
	const { fetchAllLifts, allLifts } = useContext(UserStatsContext);
	const { user } = useContext(AuthContext);

	const [currentFriends, setCurrentFriends] = useState<
		{ id: string; displayName: string }[]
	>([]);

	const userID = user.uid;

	const fetchFriends = () => {
		const unsubscribeCurrentFriends = getCurrentFriends(
			userID,
			setCurrentFriends,
		);
		return async () => {
			(await unsubscribeCurrentFriends)();
		};
	};

	useEffect(() => {
		const unsubscribe = fetchFriends();
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (currentFriends) {
			fetchAllLifts(currentFriends[0].id);
		}
	}, [currentFriends])

	return (
		<View style={ScreenStyle.rootContainer}>
			<Text style={ScreenStyle.title}>Welcome!</Text>
			<Text style={ScreenStyle.welcomeText}> </Text>
			<FlatList
				data={allLifts}
				keyExtractor={(item) => item.id}
				renderItem={liftHistoryList}
			/>
		</View>
	);
}

export default FriendsFeedView;
