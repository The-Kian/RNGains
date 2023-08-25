import firestore from "@react-native-firebase/firestore";
import { Lift } from "../../context/userStats/UserStatsTypes";
import { IFriend, IFriendsLifts } from "../../constants/types/friend";
//TO DO Parallelize this using promise.all()
export const fetchFriendsLifts = async (
	friends: IFriend[],
): Promise<IFriendsLifts[]> => {
	const results: IFriendsLifts[] = [];
	for (const friend of friends) {
		console.log("🚀 ~ file: FriendsFeedQueries.ts:13 ~ friend.id:", friend.id);
		const querySnapshot = await firestore()
			.collection("users")
			.doc(friend.id)
			.collection("lifts")
			.orderBy("timestamp", "desc")
			.limit(10)
			.get();
		console.log(
			"🚀 ~ file: FriendsFeedQueries.ts:12 ~ querySnapshot:",
			querySnapshot,
		);

		if (!querySnapshot.empty) {
			const allLiftData: Lift[] = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				squatWeight: doc.data().squatWeight,
				userWeight: doc.data().userWeight,
				deadliftWeight: doc.data().deadliftWeight,
				benchWeight: doc.data().benchWeight,
				timestamp: doc.data().timestamp,
			}));
			console.log("🚀 ~ file: FriendsFeedQueries.ts:32 ~ constallLiftData:Lift[]=querySnapshot.docs.map ~ allLiftData:", allLiftData)
			
			results.push({ friend: friend, lifts: allLiftData });
		}
	}
	console.log("🚀 ~ file: FriendsFeedQueries.ts:33 ~ results:", results);
	return results;
};
