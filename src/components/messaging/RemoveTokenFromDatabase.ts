import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";


async function RemoveTokenFromDatabase(userID: string) {
	console.log("🚀 ~ file: RemoveTokenFromDatabase.ts:6 ~ RemoveTokenFromDatabase ~ RemoveTokenFromDatabase:")
	const token = await messaging().getToken();
	await firestore()
		.collection("users")
		.doc(userID)
		.update({
			tokens: firestore.FieldValue.arrayRemove(token),
		}).then(() => {
			console.log("🚀 ~ file: RemoveTokenFromDatabase.ts:15 ~ RemoveTokenFromDatabase ~ token removed from database");
		})
		.catch((error) => {
			console.log("🚀 ~ file: RemoveTokenFromDatabase.ts:15 ~ RemoveTokenFromDatabase ~ error:", error.code);
		});
}
 
export default RemoveTokenFromDatabase;