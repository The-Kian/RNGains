import firestore from "@react-native-firebase/firestore";

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
		}),
	);

	return friendDetails;
};

export const getAllFriends = async (
	userID: string,
	setAllFriends: (
		friends : { id: string; displayName: string; }[],
	) => void,
) => {
	const userFriendsRef = firestore()
		.collection("users")
		.doc(userID)
		.collection("friends");
	return userFriendsRef.onSnapshot(async (querySnapshot) => {
		const friends: string[] = [];

		querySnapshot.forEach((doc) => {
			const friendID = doc.data().friendID;
			friends.push(friendID);
		});
		const friendDetails = await getFriendDetails(friends);
		setAllFriends(friendDetails);
	});
};

export const getReceivedFriendRequests = async (
	userID: string,
	setFriendRequests: (
		requests: { id: string; displayName: string; }[],
	) => void,
) => {
	const userFriendsRef = firestore()
		.collection("users")
		.doc(userID)
		.collection("friends");
	const query = userFriendsRef.where("status", "==", "received");

	return query.onSnapshot(async (querySnapshot) => {
		const friendRequests: string[] = [];

		querySnapshot.forEach((doc) => {
			const friendID = doc.data().friendID;
			friendRequests.push(friendID);
		});
		const friendDetails = await getFriendDetails(friendRequests);
		setFriendRequests(friendDetails);
	});
};

export const getCurrentFriends = async (
	userID: string,
	setCurrentFriends: (
		requests: { id: string; displayName: string;}[],
	) => void,
) => {
	const userFriendsRef = firestore()
		.collection("users")
		.doc(userID)
		.collection("friends");
	const query = userFriendsRef.where("status", "==", "accepted");

	return query.onSnapshot(async (querySnapshot) => {
		const currentFriends: string[] = [];

		querySnapshot.forEach((doc) => {
			const friendID = doc.data().friendID;
			currentFriends.push(friendID);
		});
		const friendDetails = await getFriendDetails(currentFriends);
		setCurrentFriends(friendDetails);
	});
};

export const getDeniedFriends = async (
	userID: string,
	setDeniedFriends: (
		requests: { id: string; displayName: string;}[],
	) => void,
) => {
	const userFriendsRef = firestore()
		.collection("users")
		.doc(userID)
		.collection("friends");
	const query = userFriendsRef.where("status", "==", "denied");

	return query.onSnapshot(async (querySnapshot) => {
		const deniedFriends: string[] = [];

		querySnapshot.forEach((doc) => {
			const friendID = doc.data().friendID;
			deniedFriends.push(friendID);
		});
		const friendDetails = await getFriendDetails(deniedFriends);
		setDeniedFriends(friendDetails);
	});
};
