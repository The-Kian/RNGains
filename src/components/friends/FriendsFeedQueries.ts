import firestore from "@react-native-firebase/firestore";
import { Lift } from "../../context/userStats/UserStatsTypes";
import { IFriend, IFriendsLifts } from "../../constants/types/friend";
import { AuthContext } from "../../context/auth/AuthProvider";
import { useContext } from "react";

//TO DO Parallelize this using promise.all()
export const fetchFriendsLifts = async (
	friends: IFriend[],
): Promise<IFriendsLifts[]> => {
	const results: IFriendsLifts[] = [];
	for (const friend of friends) {
		const querySnapshot = await firestore()
			.collection("users")
			.doc(friend.id)
			.collection("lifts")
			.orderBy("timestamp", "desc")
			.limit(10)
			.get();
		if (!querySnapshot.empty) {
			const allLiftData: Lift[] = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				squatWeight: doc.data().squatWeight,
				userWeight: doc.data().userWeight,
				deadliftWeight: doc.data().deadliftWeight,
				benchWeight: doc.data().benchWeight,
				timestamp: doc.data().timestamp,
				kudos: doc.data().kudos,
			}));

			results.push({ friend: friend, lifts: allLiftData });
		}
	}
	return results;
};

export const giveKudos = async (
	friendID: string,
	liftID: string,
): Promise<void> => {
	const {user} = useContext(AuthContext);
	const userID = user?.uid;
	const docRef = firestore()
		.collection("users")
		.doc(friendID)
		.collection("lifts")
		.doc(liftID);

	const doc = await docRef.get();
	if (!doc.exists) {
		console.error("Document does not exist!");
		return;
	}

	const data = doc.data();
	const kudosArray = data?.kudos || [];

	// Check if userID already exists in kudos array
	if (kudosArray.some((entry: any) => entry.userID === userID)) {
		console.log("Entry with the same userID already exists.");
		return;
	}

	await docRef.update({
		kudos: firestore.FieldValue.arrayUnion({
			userID,
			timestamp: firestore.Timestamp.now(),
		}),
	});
};
