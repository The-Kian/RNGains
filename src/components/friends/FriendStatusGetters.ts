import firestore, {
	FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

const getFriendDetails = async (friendsRequests: string[]) => {
	const friendDetails = await Promise.all(
		friendsRequests.map(async (friendID: string) => {
			const friendRef = firestore().collection("users").doc(friendID);
			const friendDoc = await friendRef.get();
			const friendData = friendDoc.data();
			return {
				id: friendID,
				displayName: friendData?.displayName,
			};
		})
	);

	return friendDetails;
};

export const getFriendRequests = async (userID: string) => {
	const userFriendsRef = firestore()
		.collection("users")
		.doc(userID)
		.collection("friends");
	const query = userFriendsRef.where("status", "==", "accepted");
	const querySnapshot = await query.get();

	const friendRequests: string[] = [];

	querySnapshot.forEach((doc) => {
		const friendID = doc.data().friendID;
		friendRequests.push(friendID);
	});

	return getFriendDetails(friendRequests);
};

export const getCurrentFriends = async (userID: string) => {
	const userFriendsRef = firestore()
		.collection("users")
		.doc(userID)
		.collection("friends");
	const query = userFriendsRef.where("status", "==", "received");
	const querySnapshot = await query.get();

	const currentFriends: string[] = [];

	querySnapshot.forEach((doc) => {
		const friendID = doc.data().friendID;
		currentFriends.push(friendID);
	});

	return getFriendDetails(currentFriends);
};
