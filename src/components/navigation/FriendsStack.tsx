import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendRequestFeedView } from "../../screens/friends/FriendRequestFeedView";
import FriendsFeedView from "../../screens/friends/FriendsFeedView";
import FriendsScreen from "../../screens/friends/FriendsScreen";

const Stack = createNativeStackNavigator();

function FriendsStack() {
  return (
    <Stack.Navigator initialRouteName="FriendsScreen">
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="FriendRequests" component={FriendRequestFeedView} />
      <Stack.Screen name="FriendFeed" component={FriendsFeedView} />
    </Stack.Navigator>
  );
}

export default FriendsStack;
