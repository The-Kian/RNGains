// import { createContext, ReactNode, useContext } from "react";
// import { AuthContext, AuthProvider, ProviderProps } from "../auth/AuthProvider";
// import firestore from "@react-native-firebase/firestore";
// import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export {}

// interface UserStatsContextType {
//   uploadStats: (props: {
//     user: FirebaseAuthTypes.User
//     weight: number;
//     squat: number;
//     bench: number;
//     deadlift: number;
//   }) => Promise<void>;
// }

// const defaultUserStatsContext: UserStatsContextType = {
//     uploadStats: async () => { },
// };

// export const UserStatsContext = createContext<UserStatsContextType>(defaultUserStatsContext)

// export type UserStatsProviderProps = {
//     children?: ReactNode
// }

// export const UserStatsProvider: React.FC<UserStatsProviderProps> = ({children}) => {

//     const uploadStats = async ({
//         user,
//         weight,
//         squat,
//         bench,
//         deadlift,
//       }: {
//         user: FirebaseAuthTypes.User;
//         weight: number;
//         squat: number;
//         bench: number;
//         deadlift: number;
//       }) => {
//         await firestore()
//         .collection(user.uid)
//         .doc('userStats')
//         .set({
//             weight: weight,
//             squat: squat,
//             deadlift: deadlift,
//             bench: bench,
//         })
//         .then(() => {
//             console.log('stats updated')
//         })
//       };

//       const value: UserStatsContextType = {
//         uploadStats,
//       };

//       return <UserStatsContext.Provider value={value}>{children}</UserStatsContext.Provider>;
// }