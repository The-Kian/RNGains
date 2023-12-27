import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View, Button } from "react-native";
import { LiftDisplayList } from "../../components/ui/LiftFeed/LiftDisplayList";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import { fetchFriendsLifts } from "../../components/friends/FriendsFeedQueries";
import { IFriendsLifts } from "../../constants/types/friend";
import { FriendsContext } from "../../context/friends/FriendsProvider";

function FriendsFeedView() {
  const { currentFriends } = useContext(FriendsContext);

  const [friendsLifts, setFriendsLifts] = useState<IFriendsLifts[]>([]);

  const fetchAndSetFriendsLifts = async () => {
    const receivedFriendsLifts = await fetchFriendsLifts(currentFriends);
    setFriendsLifts(receivedFriendsLifts);
  };

  useEffect(() => {
    if (currentFriends) {
      fetchAndSetFriendsLifts();
    }
  }, [currentFriends]);

  return (
    <View style={ScreenStyle.rootContainer}>
      <Text style={ScreenStyle.title}>Welcome!</Text>
      <Text style={ScreenStyle.welcomeText}> </Text>
      <FlatList
        data={friendsLifts}
        keyExtractor={(item) => item.friend.id}
        renderItem={(props) => (
          <LiftDisplayList {...props} friendID={props.item.friend.id} displayName={props.item.friend.displayName} />
        )}
      />
      <Button title="Refresh" onPress={fetchAndSetFriendsLifts} />
    </View>
  );
}

export default FriendsFeedView;
