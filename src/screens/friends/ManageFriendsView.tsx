import React, { useState } from "react";
import { Button, View } from "react-native";
import SearchFriendsView from "./SearchFriendsView";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import { FriendRequestFeedView } from "./FriendRequestFeedView";

export default function ManageFriendsView() {
  const [activeView, setActiveView] = useState("friendRequests");

  return (
    <View style={ScreenStyle.rootContainer}>
      <View>
        <Button title="Search" onPress={() => setActiveView("search")} />
        <Button title="View Friends" onPress={() => setActiveView("friendRequests")} />
      </View>
      {activeView === "friendRequests" ? <FriendRequestFeedView /> : <SearchFriendsView />}
    </View>
  );
}
