import React, { useEffect, useState, useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../context/auth/AuthProvider";
import {
	getCurrentFriends,
	getDeniedFriends,
	getFriendRequests,
} from "../../components/friends/FriendStatusGetters";
import { respondToFriendRequest } from "../../components/friends/FriendRequest";
import { contentStyle } from "../../constants/styles/contentStyles";
import { ScreenStyle } from "../../constants/styles/screenStyles";

export const FriendRequestFeed = () => {
	const { user } = useContext(AuthContext);
	const [friendRequests, setFriendRequests] = useState<
		{ id: string; displayName: string }[]
	>([]);
	const [currentFriends, setCurrentFriends] = useState<
		{ id: string; displayName: string }[]
	>([]);
	const [deniedFriends, setDeniedFriends] = useState<
		{ id: string; displayName: string }[]
	>([]);

	const userID = user.uid;

	const fetchFriends = async () => {
		console.log(`KP - fetchFriends running`)
		const friendRequests = await getFriendRequests(userID);
		const currentFriends = await getCurrentFriends(userID);
		const deniedFriends = await getDeniedFriends(userID);
		setFriendRequests(friendRequests);
		setCurrentFriends(currentFriends);
		setDeniedFriends(deniedFriends);
	};

	const friendRequestResponseHandler = async (
		userID: string,
		friendID: string,
		response: string,
	) => {
		respondToFriendRequest({ userID, friendID, response });
		fetchFriends();
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	return (
		<View style={contentStyle.friendFeedContent}>
			<View>
				{friendRequests.map((request) => (
					<View style={ScreenStyle.friendStatusContainer} key={request.id}>
						<Text>FriendRequest from {request.displayName}</Text>
						<Button
							title="Accept"
							onPress={() =>
								friendRequestResponseHandler(userID, request.id, "accepted")
							}
						/>
						<Button
							title="Decline"
							onPress={() =>
								friendRequestResponseHandler(userID, request.id, "denied")
							}
						/>
					</View>
				))}
			</View>

			<View>
				{currentFriends.map((friendData) => (
					<View style={ScreenStyle.friendStatusContainer} key={friendData.id}>
						<Text>Friends with {friendData.displayName}</Text>
						<Button title="Remove Friend" onPress={() => {friendRequestResponseHandler(userID, friendData.id, "remove")}} />
					</View>
				))}
			</View>
			<View>
				{deniedFriends.map((friendData) => (
					<View style={ScreenStyle.friendStatusContainer} key={friendData.id}>
						<Text>Denied friend request from {friendData.displayName}</Text>
						<Button title="Remove" onPress={() => {friendRequestResponseHandler(userID, friendData.id, "remove")}} />
					</View>
				))}
			</View>
		</View>
	);
};
