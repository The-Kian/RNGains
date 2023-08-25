import firestore from "@react-native-firebase/firestore";
import { Lift } from "../../context/userStats/UserStatsTypes";

export const fetchFriendsLifts = async (friendIDs: string[]) => {
	const friendsLifts: { [friendID: string]: Lift[] } = {};
	for (const friendID in friendIDs) {
		const querySnapshot = await firestore()
			.collection("lifts")
			.doc(friendID)
			.collection("lifts")
			.orderBy("timestamp", "desc")
			.limit(20)
			.get();

		if (!querySnapshot.empty) {
			const docs = querySnapshot.docs;
			const allLiftData: Lift[] = [];
			docs.forEach((doc) => {
				const data = doc.data();
				allLiftData.push({
					id: doc.id,
					squatWeight: data.squatWeight,
					userWeight: data.userWeight,
					deadliftWeight: data.deadliftWeight,
					benchWeight: data.benchWeight,
					timestamp: data.timestamp,
				});
			});
			friendsLifts[friendID] = allLiftData;
		}
	}
};
