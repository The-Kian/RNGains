import { Lift } from "../../context/userStats/UserStatsTypes";

export interface IFriend {
	id: string;
	displayName: string;
}

export interface IFriendsLifts {
    friend: IFriend;
    lifts: Lift[];
}