import firestore, {
	FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import React from "react";

interface sendFriendRequestProps {
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
		status: status,
		timestamp: firestore.FieldValue.serverTimestamp(),
	});
};

export const sendFriendRequest = async ({
	userID,
	friendID,
}: sendFriendRequestProps) => {
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
