import firestore, {
	FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import React from "react";

interface friendRequestProps {
	userID: string;
	friendID: string;
}

interface AddFriendRequestToUserProps {
	batch: FirebaseFirestoreTypes.WriteBatch;
	userID: string;
	friendID: string;
	status: string;
}

const addFriendRequestToUser = ({
	batch,
	userID,
	friendID,
	status,
}: AddFriendRequestToUserProps) => {
	const userFriendsRef = firestore()
		.collection("users")
		.doc(userID)
		.collection("friends")
		.doc(friendID);
	batch.set(userFriendsRef, {
		friendID: friendID,
		status: status,
		timestamp: firestore.FieldValue.serverTimestamp(),
	});
};

export const sendFriendRequest = async ({
	userID,
	friendID,
}: friendRequestProps) => {
	const batch = firestore().batch();

	addFriendRequestToUser({
		batch,
		userID,
		friendID,
		status: "requested",
	});

	addFriendRequestToUser({
		batch,
		userID: friendID,
		friendID: userID,
		status: "received",
	});

	return batch
		.commit()
		.then(() => {
			Alert.alert("Friend request sent");
		})
		.catch((error) => {
			Alert.alert(error.message);
		});
};

export const acceptFriendRequest = async ({
	userID,
	friendID,
}: friendRequestProps) => {
	const batch = firestore().batch();
	console.log('acceptFriendRequest')

	addFriendRequestToUser({
		batch,
		userID,
		friendID,
		status: "accepted",
	});

	addFriendRequestToUser({
		batch,
		userID: friendID,
		friendID: userID,
		status: "accepted",
	});

	return batch
		.commit()
		.then(() => {
			Alert.alert("Friend request accepted");
		})
		.catch((error) => {
			Alert.alert(error.message);
		});
}