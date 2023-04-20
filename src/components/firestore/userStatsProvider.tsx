import firestore from "@react-native-firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ProviderProps } from "../../constants/genericTypes";
import { AuthContext } from "../auth/AuthProvider";
import {
	defaultUserStatsContext,
	Lift,
	UserStatsContextType,
} from "./UserStatsTypes";

export const UserStatsContext = createContext(defaultUserStatsContext);

export function UserStatsProvider({ children }: ProviderProps) {
	const [latestLift, setLatestLift] = useState<Lift | null>(null);
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
		const querySnapshot = await firestore()
			.collection("users")
			.doc(userID)
			.collection("lifts")
			.orderBy("timestamp", "desc")
			.limit(1)
			.get();

		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			const latestLiftData: Lift = { id: doc.id, ...doc.data() } as Lift;
			setLatestLift(latestLiftData);
			setLoading(false)
		} else {
			console.log("No latest lift found");
		}
	};

	const value: UserStatsContextType = {
		uploadStats,
		latestLift: null,
		fetchLatestLift: function (userID: string): void {
			throw new Error("Function not implemented.");
		},
	};

	return (
		<UserStatsContext.Provider value={{latestLift, uploadStats, fetchLatestLift}}>
			{children}
		</UserStatsContext.Provider>
	);
}
