import firestore from "@react-native-firebase/firestore";
import { Lift } from "../../context/userStats/UserStatsTypes";
import { IFriend, IFriendsLifts } from "../../constants/types/friend";
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
			}));
			
			results.push({ friend: friend, lifts: allLiftData });
		}
	}
	return results;
};
