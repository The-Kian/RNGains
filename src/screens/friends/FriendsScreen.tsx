
import { Button, View } from "react-native";
import { useState } from "react";

import FeedView from "./FeedView";
import SearchFriendsView from "./SearchFriendsView";
import { ScreenStyle } from "../../constants/styles";


export default function FriendsScreen() {
  const [activeView, setActiveView] = useState("feed");
  return (
    <View style={ScreenStyle.rootContainer}>
      <View>
        <Button title="Feed" onPress={() => setActiveView('feed')} />
        <Button title="Search" onPress={() => setActiveView('search')} />
      </View>
      {activeView === 'feed' ? <FeedView /> : <SearchFriendsView />}
    </View>
  );
}
