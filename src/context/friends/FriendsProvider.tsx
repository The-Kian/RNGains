import { useState, useEffect, useContext, createContext } from "react";
import {
	getReceivedFriendRequests,
	getCurrentFriends,
	getDeniedFriends,
	getAllFriends,
} from "../../components/friends/FriendStatusGetters";
import { ProviderProps } from "../../constants/genericTypes";
import { IFriend } from "../../constants/types/friend";
import { AuthContext } from "../auth/AuthProvider";
import { defaultFriendsContext } from "./FriendsProviderTypes";

export const FriendsContext = createContext(defaultFriendsContext);

export function FriendsProvider({ children }: ProviderProps): JSX.Element {
	const { user } = useContext(AuthContext);
	const [friendRequests, setFriendRequests] = useState<IFriend[]>([]);
	const [currentFriends, setCurrentFriends] = useState<IFriend[]>([]);
	const [deniedFriends, setDeniedFriends] = useState<IFriend[]>([]);
	const [allFriends, setAllFriends] = useState<IFriend[]>([]);

	const userID = user.uid;

	const fetchFriends = () => {
		// Set up listeners for each type of friend request:
		const unsubscribeFriendRequests = getReceivedFriendRequests(
			userID,
			setFriendRequests,
		);
		const unsubscribeCurrentFriends = getCurrentFriends(
			userID,
			setCurrentFriends,
		);
		const unsubscribeDeniedFriends = getDeniedFriends(userID, setDeniedFriends);

		const unsubscribeAllFriends = getAllFriends(userID, setAllFriends);

		// Return a cleanup function that removes all the listeners:
		return async () => {
			(await unsubscribeFriendRequests)();
			(await unsubscribeCurrentFriends)();
			(await unsubscribeDeniedFriends)();
			(await unsubscribeAllFriends)();
		};
	};

	useEffect(() => {
		const unsubscribe = fetchFriends();
		return () => {
			unsubscribe();
		};
	}, []);

	const value = {
		friendRequests,
		currentFriends,
		deniedFriends,
		allFriends,
		fetchFriends,
	};

	return (
		<FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
	);
}
