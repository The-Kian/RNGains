import firestore from "@react-native-firebase/firestore";


async function saveTokenToDatabase(token: string, userID: string) {
	console.log("🚀 ~ file: SaveTokenToDatabase.ts:6 ~ saveTokenToDatabase ~ saveTokenToDatabase:")
	
	await firestore()
		.collection("users")
		.doc(userID)
		.update({
			tokens: firestore.FieldValue.arrayUnion(token),
		}).then(() => {
			console.log("🚀 ~ file: SaveTokenToDatabase.ts:15 ~ saveTokenToDatabase ~ token saved to database");
		})
		.catch((error) => {
			console.log("🚀 ~ file: SaveTokenToDatabase.ts:15 ~ saveTokenToDatabase ~ error:", error.code);
			if (error.code === "firestore/not-found") {
				firestore()
					.collection("users")
					.doc(userID)
					.set({
						tokens: [token],
					})
					.then(() => {
						console.log("🚀 ~ file: SaveTokenToDatabase.ts:26 ~ saveTokenToDatabase ~ token saved to database");
					}).catch((error) => {
						console.log("🚀 ~ file: SaveTokenToDatabase.ts:28 ~ saveTokenToDatabase ~ error:", error);
					}
					);
			}
		});
}
 
export default saveTokenToDatabase;