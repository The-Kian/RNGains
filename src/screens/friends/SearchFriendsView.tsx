import { Text, View } from "react-native";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import {
	InstantSearch,
	Configure,
} from "react-instantsearch-core";
import { SearchBox } from "../../components/ui/FriendRequests/SearchBox";
import { InfiniteHits } from "../../components/ui/FriendRequests/InfiniteHits";
import { DisplayNameHitElement } from "../../components/ui/FriendRequests/DisplayNameHitElement";
import { algoliaClient } from "../../constants/algoliaHit/algolia";
import { useState,  useContext } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";
import { FriendsContext } from "../../context/friends/FriendsProvider";

export default function SearchFriendsView() {
	const { user } = useContext(AuthContext);
	const { allFriends } = useContext(FriendsContext);
	const [query, setQuery] = useState("");

	const userDisplayName = user.displayName;

	const friendFilters = allFriends.map((friend) => `${friend.id}`);

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
