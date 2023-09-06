import { IFriendsLifts } from "../../../constants/types/friend";
import { Lift } from "../../../context/userStats/UserStatsTypes";
import FriendsLiftsElement from "./friends/FriendsLiftsElement";
import UserLiftsElement from "./user/UserLiftsElement";

interface LiftHistoryProps {
	item: Lift | IFriendsLifts;
	friendID?: string;
	displayName?: string;
}

export const LiftDisplayList = ({
	item,
	friendID,
	displayName,
}: LiftHistoryProps) => {
	if (friendID) {
		// if item is a friendsLift
		const friendLifts = (item as IFriendsLifts).lifts;
		return (
			<FriendsLiftsElement lifts={friendLifts} friendID={friendID} displayName={displayName || ''} />
		);
	} else {
		const userLift = item as Lift;
		return <UserLiftsElement lift={userLift} />;
	}
};
