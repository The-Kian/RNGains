import firestore from "@react-native-firebase/firestore";

async function saveTokenToDatabase(token: string, userID: string) {
	try {
		console.log(
			`🚀 ~ file: SaveTokenToDatabase.ts:6 ~ saveTokenToDatabase ~ userID: ${userID}`,
		);

		await firestore()
			.collection("users")
			.doc(userID)
			.update({
				tokens: firestore.FieldValue.arrayUnion(token),
			});

		console.log(
			"🚀 ~ file: SaveTokenToDatabase.ts:15 ~ saveTokenToDatabase ~ token saved to database",
		);
	} catch (error) {
		console.log(
			"🚀 ~ file: SaveTokenToDatabase.ts:15 ~ saveTokenToDatabase ~ error:",
			error.code,
		);
		if (error.code === "firestore/not-found") {
			try {
				await firestore()
					.collection("users")
					.doc(userID)
					.set({
						tokens: [token],
					});

				console.log(
					"🚀 ~ file: SaveTokenToDatabase.ts:26 ~ saveTokenToDatabase ~ token saved to database",
				);
			} catch (innerError) {
				console.log(
					"🚀 ~ file: SaveTokenToDatabase.ts:28 ~ saveTokenToDatabase ~ error:",
					innerError,
				);
			}
		}
	}
}

export default saveTokenToDatabase;
