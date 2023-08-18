import { Text, View } from "react-native";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import {
	InstantSearch,
	Configure,
} from "react-instantsearch-hooks";
import { SearchBox } from "../../components/ui/FriendRequests/SearchBox";
import { InfiniteHits } from "../../components/ui/FriendRequests/InfiniteHits";
import { DisplayNameHitElement } from "../../components/ui/FriendRequests/DisplayNameHitElement";
import { algoliaClient } from "../../constants/algoliaHit/algolia";
import { useState,  useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";
import { getAllFriends } from "../../components/friends/FriendStatusGetters";

export default function SearchFriendsView() {
	const { user } = useContext(AuthContext);
	const [query, setQuery] = useState("");
	const [allFriends, setAllFriends] = useState<
		{ id: string; displayName: string }[]
	>([]);
	const userDisplayName = user.displayName;
	const userID = user.uid;

	const fetchFriends = () => {
		// Set up listeners for each type of friend request:
		const unsubscribeAllFriends = getAllFriends(userID, setAllFriends);
		// Return a cleanup function that removes all the listeners:
		return async () => {
			(await unsubscribeAllFriends)();
		};
	};

	const friendFilters = allFriends.map((friend) => `${friend.id}`);
	useEffect(() => {
		const unsubscribe = fetchFriends();
		
		return () => {
			unsubscribe();
		}
	}, []);

	return (
		<View style={ScreenStyle.rootContainer}>
			<InstantSearch searchClient={algoliaClient} indexName="dev_RNGains">
				<Configure filters={`NOT displayName:${userDisplayName}`} />
				<Text>Search</Text>
				<SearchBox onQueryChange={setQuery} />
				<InfiniteHits
					hitComponent={DisplayNameHitElement}
					hide={query.trim() === ""}
					friendFilters={friendFilters}
				/>
			</InstantSearch>
		</View>
	);
}
