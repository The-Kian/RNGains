
import { Button, View } from "react-native";
import { useState } from "react";

import FriendRequestView from "./FriendRequestView";
import SearchFriendsView from "./SearchFriendsView";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import FriendsFeedView from "./FriendsFeedView";


export default function FriendsScreen() {
	const [activeView, setActiveView] = useState("feed");
	return (
		<View style={ScreenStyle.rootContainer}>
			<View>
				<Button title="Manage Friends" onPress={() => setActiveView('friendRequests')} />
				<Button title="Feed" onPress={() => setActiveView('feed')} />
			</View>
			{activeView === 'friendRequests' ? <FriendRequestView /> : <FriendsFeedView />}
		</View>
	);
}
