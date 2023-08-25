import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../../context/auth/AuthProvider";
import { getCurrentFriends } from "../../components/friends/FriendStatusGetters";

import { liftsDisplayList } from "../../components/ui/LiftHistory/LiftHistoryList";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import { fetchFriendsLifts } from "../../components/friends/FriendsFeedQueries";
import { IFriend, IFriendsLifts } from "../../constants/types/friend";

function FriendsFeedView() {
	const { user } = useContext(AuthContext);

	const [currentFriends, setCurrentFriends] = useState<IFriend[]>([]);

	const [friendsLifts, setFriendsLifts] = useState<IFriendsLifts[]>([]);

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
		console.log(
			"🚀 ~ file: FriendsFeedView.tsx:15 ~ FriendsFeedView ~ currentFriends:",
			currentFriends,
		);

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (currentFriends) {
			(async () => {
				const receivedFriendsLifts = await fetchFriendsLifts(currentFriends);
				setFriendsLifts(receivedFriendsLifts);
			})();
		}
	}, [currentFriends]);

	return (
		<View style={ScreenStyle.rootContainer}>
			<Text style={ScreenStyle.title}>Welcome!</Text>
			<Text style={ScreenStyle.welcomeText}> </Text>
			<FlatList
				data={friendsLifts}
				keyExtractor={(item) => item.friend.id}
				renderItem={(props) =>
					liftsDisplayList({ ...props, friendID: props.item.friend.id, displayName: props.item.friend.displayName })
				}
			/>
		</View>
	);
}

export default FriendsFeedView;
