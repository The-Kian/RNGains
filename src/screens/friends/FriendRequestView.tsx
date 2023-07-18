import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";
import { getCurrentFriends, getFriendRequests } from "../../components/friends/FriendStatusGetters";
import { acceptFriendRequest } from "../../components/friends/FriendRequest";
import SearchFriendsView from "./SearchFriendsView";
import { ScreenStyle } from "../../constants/styles/screenStyles";

import { contentStyle } from "../../constants/styles/contentStyles";

export default function FriendRequestView() {
	const { user } = useContext(AuthContext);
	const [friendRequests, setFriendRequests] = useState<
		{ id: string; displayName: string }[]
	>([]);
	const [currentFriends, setCurentFriends] = useState<
		{ id: string; displayName: string }[]
	>([]);
	const [activeView, setActiveView] = useState("search");

	const userID = user.uid;
	
	const fetchFriends = async () => {
		const friendRequests = await getFriendRequests(userID);
		const currentFriends = await getCurrentFriends(userID);
		setFriendRequests(friendRequests);
		setCurentFriends(currentFriends);
	};

	const friendRequestResponseHandler = async (userID: string, friendID: string, response: string) => {
		if (response === "accept") {
			await acceptFriendRequest({ userID, friendID });
		} else if (response === "decline") {
			console.log('denied')
		}
		fetchFriends();
	};


	useEffect(() => {
		fetchFriends();
	}, [friendRequests, currentFriends]);

	const FriendRequestFeed = () => {
		return (
			<View style={contentStyle.friendFeedContent}>
				<View>
					{friendRequests.map((request) => (
						<View style={ScreenStyle.friendStatusContainer} key={request.id}>
							<Text>FriendRequest from {request.displayName}</Text>
							<Button
								title="Accept"
								onPress={() =>
									friendRequestResponseHandler(userID, request.id, "accept")
								}
							/>
							<Button
								title="Decline"
								onPress={() =>
									friendRequestResponseHandler(userID, request.id, "decline")
								}
							/>
						</View>
					))}
				</View>

				<View>
					{friendRequests.map((friendData) => (
						<View style={ScreenStyle.friendStatusContainer} key={friendData.id}>
							<Text>Friends with {friendData.displayName}</Text>
						</View>
					))}
				</View>
			</View>
		);
	};

	return (
		<View style={ScreenStyle.rootContainer}>
			<View>
				<Button title="Search" onPress={() => setActiveView("search")} />
				<Button
					title="View Friends"
					onPress={() => setActiveView("friendRequests")}
				/>
			</View>
			{activeView === "friendRequests" ? (
				<FriendRequestFeed />
			) : (
				<SearchFriendsView />
			)}
		</View>
	);
}
