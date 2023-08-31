import { Button, View } from "react-native";
import { useState } from "react";

import ManageFriendsView from "./ManageFriendsView";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import FriendsFeedView from "./FriendsFeedView";
import { FriendsProvider } from "../../context/friends/FriendsProvider";

export default function FriendsScreen() {
	const [activeView, setActiveView] = useState("feed");
	return (
		<FriendsProvider>
			<View style={ScreenStyle.rootContainer}>
				<View>
					<Button
						title="Manage Friends"
						onPress={() => setActiveView("friendRequests")}
					/>
					<Button title="Feed" onPress={() => setActiveView("feed")} />
				</View>
				{activeView === "friendRequests" ? (
					<ManageFriendsView />
				) : (
					<FriendsFeedView />
				)}
			</View>
		</FriendsProvider>
	);
}
