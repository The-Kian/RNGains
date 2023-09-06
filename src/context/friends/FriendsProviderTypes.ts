import { IFriend } from "../../constants/types/friend"; // Import your IFriend type

export interface FriendsContextType {
	friendRequests: IFriend[];
	currentFriends: IFriend[];
	deniedFriends: IFriend[];
	allFriends: IFriend[];
	fetchFriends: () => () => Promise<void>;
}

export const defaultFriendsContext: FriendsContextType = {
	friendRequests: [],
	currentFriends: [],
	deniedFriends: [],
	allFriends: [],
	fetchFriends: () => async () => {},
};
