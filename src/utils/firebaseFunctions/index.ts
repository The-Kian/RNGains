import admin from "firebase-admin";

async function sendFriendRequestNotification(userID: string, friendID: string) {
	console.log(
		"🚀 ~ file: index.ts:4 ~ sendFriendRequestNotification ~ friendID:",
		friendID,
	);
	const userRef = admin.firestore().collection("users").doc(userID);
	const userDoc = await userRef.get();
	const friendRef = admin.firestore().collection("users").doc(friendID);
	const friendDoc = await friendRef.get();

	const getMessaging = admin.messaging();
	// const options = {
	// 	// Required for background/quit data-only messages on iOS
	// 	contentAvailable: true,
	// 	// Required for background/quit data-only messages on Android
	// 	priority: "high",
	// };
	const payload = {
		data: {
			type: "friendRequest",
			userID: userID,
			friendID: friendID,
			name: userDoc.data()?.name,
		},
		token: friendDoc.data()?.tokens[0],
	};

	await getMessaging
		.send(payload)
		.then((response) => {
			console.log("🚀 ~ file: index.ts:33 ~ response:", response);
		})
		.catch((error) => {
			console.log("🚀 ~ file: index.ts:35 ~ error:", error);
		});
}

export default sendFriendRequestNotification;