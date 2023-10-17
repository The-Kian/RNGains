import firestore from "@react-native-firebase/firestore";

async function removeTokenFromDatabase(token: string, userID: string) {
	console.log(
		"🚀 ~ file: RemoveTokenFromDatabase.ts:4 ~ removeTokenFromDatabase ~ removeTokenFromDatabase:",
	);

	try {
		await firestore()
			.collection("users")
			.doc(userID)
			.update({
				tokens: firestore.FieldValue.arrayRemove(token),
			});
		console.log(
			"🚀 ~ file: RemoveTokenFromDatabase.ts:15 ~ RemoveTokenFromDatabase ~ token removed from database",
		);
	} catch (error) {
		console.log(
			"🚀 ~ file: RemoveTokenFromDatabase.ts:15 ~ RemoveTokenFromDatabase ~ error:",
			error.code,
		);
	}
}

export default removeTokenFromDatabase;
