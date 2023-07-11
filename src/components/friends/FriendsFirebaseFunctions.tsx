import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

interface FriendsFunctionsProps {
	userID: string;
	friendID: string;
}


export function FriendsFirebaseFunctions(props: FriendsFunctionsProps) {
	const requestFriend = async () => {
		console.log('requestFriend')
		try {
			await firestore()
			.collection("users")
			.doc(props.userID)
			.collection("friends")
			.doc()
			.set(
				{
					userID: props.userID,
					friendID: props.friendID,
					status: "requested",
					timestamp: firestore.FieldValue.serverTimestamp(),
				},
				{ merge: true }
			)
			} catch(error) {
				Alert.alert("Error", error);
			};
		}
		return { requestFriend }
}

