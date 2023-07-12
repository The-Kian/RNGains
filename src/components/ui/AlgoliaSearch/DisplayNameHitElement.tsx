import { Text } from "react-native";
import { userDetailHit } from "../../../constants/algoliaHit/algoliaHitTypes";
import { Button } from "react-native";

import { useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthProvider";
import { sendFriendRequest } from "../../../components/friends/FriendRequest";

interface HitProps {
	hit: userDetailHit;
}

export function DisplayNameHitElement({ hit }: HitProps) {
	const { user } = useContext(AuthContext);


	return (
		<>
			<Text>{hit.displayName}</Text>
			<Button title="Add Friend" onPress={() => sendFriendRequest({ userID: user.uid, friendID: hit.objectID })} />
		</>
	);
}
