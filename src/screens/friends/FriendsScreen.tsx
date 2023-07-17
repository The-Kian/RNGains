
import { Button, View } from "react-native";
import { useState } from "react";

import FriendRequestView from "./FriendRequestView";
import SearchFriendsView from "./SearchFriendsView";
import { ScreenStyle } from "../../constants/styles";


export default function FriendsScreen() {
  const [activeView, setActiveView] = useState("feed");
  return (
    <View style={ScreenStyle.rootContainer}>
      <View>
        <Button title="Friend Requests" onPress={() => setActiveView('friendRequests')} />
        <Button title="Search" onPress={() => setActiveView('search')} />
      </View>
      {activeView === 'friendRequests' ? <FriendRequestView /> : <SearchFriendsView />}
    </View>
  );
}
