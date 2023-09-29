import firestore from "@react-native-firebase/firestore";


async function removeTokenFromDatabase(token: string, userID: string) {
	console.log("🚀 ~ file: RemoveTokenFromDatabase.ts:6 ~ RemoveTokenFromDatabase ~ RemoveTokenFromDatabase:")
	
	await firestore()
		.collection("users")
		.doc(userID)
		.update({
			tokens: firestore.FieldValue.arrayRemove(token),
		}).then(() => {
			console.log("🚀 ~ file: RemoveTokenFromDatabase.ts:15 ~ RemoveTokenFromDatabase ~ token saved to database");
		})
		.catch((error) => {
			console.log("🚀 ~ file: RemoveTokenFromDatabase.ts:15 ~ RemoveTokenFromDatabase ~ error:", error.code);
		});
}
 
export default removeTokenFromDatabase;