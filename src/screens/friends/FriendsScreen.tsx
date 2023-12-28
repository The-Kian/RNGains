import { Button, View } from "react-native";
import { useEffect, useState } from "react";

import ManageFriendsView from "./ManageFriendsView";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import FriendsFeedView from "./FriendsFeedView";
import { FriendsProvider } from "../../context/friends/FriendsProvider";
import { RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
	FriendsScreen: {
	  activeView?: string;
	};
  };
  
  type FriendsScreenRouteProp = RouteProp<RootStackParamList, 'FriendsScreen'>;

export default function FriendsScreen() {
  const [activeView, setActiveView] = useState("feed");

  const route = useRoute<FriendsScreenRouteProp>();

  useEffect(() => {
    if (route.params?.activeView) {
      setActiveView(route.params.activeView);
    }
  }, [route.params?.activeView]);

  return (
    <FriendsProvider>
      <View style={ScreenStyle.rootContainer}>
        <View>
          <Button title="Manage Friends" onPress={() => setActiveView("friendRequests")} />
          <Button title="Feed" onPress={() => setActiveView("feed")} />
        </View>
        {activeView === "friendRequests" ? <ManageFriendsView /> : <FriendsFeedView />}
      </View>
    </FriendsProvider>
  );
}
