import firestore from "@react-native-firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ProviderProps } from "../../constants/genericTypes";
import { AuthContext } from "../auth/AuthProvider";
import {
	defaultUserStatsContext,
	Lift,
} from "./UserStatsTypes";

export const UserStatsContext = createContext(defaultUserStatsContext);

export function UserStatsProvider({ children }: ProviderProps) {
	const [latestLift, setLatestLift] = useState<Lift | null>(null);
	const [allLifts, setAllLifts] = useState<Lift[] | null>(null)
	const {user} = useContext(AuthContext)
	const [loading, setLoading] = useState(true)

	const uploadStats = async ({
		userID,
		userWeight,
		squatWeight,
		benchWeight,
		deadliftWeight,
	}: {
		userID: string;
		userWeight: number;
		squatWeight: number;
		benchWeight: number;
		deadliftWeight: number;
	}) => {
		await firestore()
			.collection("users")
			.doc(userID)
			.collection("lifts")
			.add({
				userWeight: userWeight,
				squatWeight: squatWeight,
				deadliftWeight: deadliftWeight,
				benchWeight: benchWeight,
				timestamp: firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				Alert.alert("Data uploaded");
			})
			.catch((error) => {
				Alert.alert("Error", error);
			});
	};

	useEffect(() => {
		fetchLatestLift(user?.uid ?? '')
	  }, [user])


	const fetchLatestLift = async (userID: string) => {
		const docSnapshot = await firestore()
			.collection("users")
			.doc(userID)
			.collection("lifts")
			.orderBy("timestamp", "desc")
			.limit(1)
			.get();

		if (!docSnapshot.empty) {
			const doc = docSnapshot.docs[0];
			const latestLiftData: Lift = { id: doc.id, ...doc.data() } as Lift;
			setLatestLift(latestLiftData);
			setLoading(false)
		} else {
		}
	};

	const fetchAllLifts = async (userID: string) => {
		const querySnapshot = await firestore()
			.collection("users")
			.doc(userID)
			.collection("lifts")
			.orderBy("timestamp", "desc")
			.limit(20)
			.get()

		if (!querySnapshot.empty) {
			const docs = querySnapshot.docs;
			const allLiftData: Lift[] = []
			docs.forEach((doc) => {
				const data = doc.data()
				allLiftData.push({
					id: doc.id,
					squatWeight: data.squatWeight,
					userWeight: data.userWeight,
					deadliftWeight: data.deadliftWeight,
					benchWeight: data.benchWeight,
					timestamp: data.timestamp
				})
			})
			setAllLifts(allLiftData);
			setLoading(false)
		} else {
		}

	};


	return (
		<UserStatsContext.Provider value={{latestLift, uploadStats, fetchLatestLift, fetchAllLifts, allLifts}}>
			{children}
		</UserStatsContext.Provider>
	);
}
