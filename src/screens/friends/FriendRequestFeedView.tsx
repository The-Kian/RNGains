import React, { useEffect, useState, useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../context/auth/AuthProvider";
import {
	getCurrentFriends,
	getDeniedFriends,
	getReceivedFriendRequests,
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
	const fetchFriends = () => {
	
		// Set up listeners for each type of friend request:
		const unsubscribeFriendRequests = getReceivedFriendRequests(userID, setFriendRequests);
		const unsubscribeCurrentFriends = getCurrentFriends(userID, setCurrentFriends);
		const unsubscribeDeniedFriends = getDeniedFriends(userID, setDeniedFriends);
	
		// Return a cleanup function that removes all the listeners:
		return async () => {
			(await unsubscribeFriendRequests)();
			(await unsubscribeCurrentFriends)();
			(await unsubscribeDeniedFriends)();
		};
	};

	const friendRequestResponseHandler = async (
		userID: string,
		friendID: string,
		response: string,
	) => {
		respondToFriendRequest({ userID, friendID, response });
	};

	useEffect(() => {
		const unsubscribe = fetchFriends();
		return () => {
			unsubscribe();
		}
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
