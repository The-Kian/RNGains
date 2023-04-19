
import firestore from "@react-native-firebase/firestore";
import { createContext } from "react";
import { Alert } from "react-native";
import { ProviderProps } from "../../constants/genericTypes";
import { defaultUserStatsContext, UserStatsContextType } from "./UserStatsTypes";

export const UserStatsContext = createContext(defaultUserStatsContext);

export function UserStatsProvider({ children }: ProviderProps) {
	
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
			.collection(userID)
			.doc("userStats")
			.set({
				weight: userWeight,
				squat: squatWeight,
				deadlift: deadliftWeight,
				bench: benchWeight,
			})
			.then(() => {
				Alert.alert('Data uploaded')
			})
	}


	const value: UserStatsContextType = {
		uploadStats
	}

	return (
		<UserStatsContext.Provider value={value}>{children}</UserStatsContext.Provider>
	);
}
