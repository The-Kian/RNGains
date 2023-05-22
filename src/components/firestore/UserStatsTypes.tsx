import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Lift {
	id: string,
	userWeight: number;
	squatWeight: number;
	deadliftWeight: number;
	benchWeight: number;
	timestamp: FirebaseFirestoreTypes.Timestamp
  }

  export type liftStatsType = {
	userID: string,
	userWeight: number
	squatWeight: number,
	deadliftWeight: number,
	benchWeight: number,
  }
  
  export type LiftsFormProps = {};

export interface UserStatsContextType {
	uploadStats: (stats: liftStatsType) => Promise<void>;
	latestLift: Lift | null
	fetchLatestLift: (userID: string) => void
	fetchAllLifts: (userID: string) => void
	allLifts?: Lift[] | null
}

export const defaultUserStatsContext: UserStatsContextType = {
	uploadStats: async () => {},
	latestLift: null,
	fetchLatestLift: async () => {},
	fetchAllLifts:async () => {},
	allLifts: null
};