import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface UserStatsContextType {
	uploadStats: (props: {
		userID: string;
		userWeight: number;
		squatWeight: number;
		benchWeight: number;
		deadliftWeight: number;
	}) => Promise<void>;
}

export const defaultUserStatsContext: UserStatsContextType = {
	uploadStats: async () => {},
};
