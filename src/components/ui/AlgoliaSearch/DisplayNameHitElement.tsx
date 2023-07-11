import { Text } from "react-native";
import { userDetailHit } from "../../../constants/algoliaHit/algoliaHitTypes";
import { Button } from "react-native";
import { FriendsFirebaseFunctions } from "../../friends/FriendsFirebaseFunctions";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthProvider";

interface HitProps {
	hit: userDetailHit;
}

export function DisplayNameHitElement({ hit }: HitProps) {
	const { user } = useContext(AuthContext);
	const { requestFriend } = FriendsFirebaseFunctions({
		userID: user.uid,
		friendID: hit.objectID,
	});

	return (
		<>
			<Text>{hit.displayName}</Text>
			<Button title="Add Friend" onPress={requestFriend} />
		</>
	);
}
