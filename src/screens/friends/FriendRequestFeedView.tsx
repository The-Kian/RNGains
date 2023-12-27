import { Button, Text, View } from "react-native";
import { respondToFriendRequest } from "../../components/friends/FriendRequest";
import { contentStyle } from "../../constants/styles/contentStyles";
import { ScreenStyle } from "../../constants/styles/screenStyles";
import { useContext } from "react";
import { FriendsContext } from "../../context/friends/FriendsProvider";
import { AuthContext } from "../../context/auth/AuthProvider";

export const FriendRequestFeedView = () => {
  const { user } = useContext(AuthContext);

  const { friendRequests, currentFriends, deniedFriends } = useContext(FriendsContext);

  const userID = user.uid;

  const friendRequestResponseHandler = async (userID: string, friendID: string, response: string) => {
    respondToFriendRequest({ userID, friendID, response });
  };
  return (
    <View style={contentStyle.friendFeedContent}>
      <View>
        {friendRequests.map((request) => (
          <View style={ScreenStyle.friendStatusContainer} key={request.id}>
            <Text>FriendRequest from {request.displayName}</Text>
            <Button title="Accept" onPress={() => friendRequestResponseHandler(userID, request.id, "accepted")} />
            <Button title="Decline" onPress={() => friendRequestResponseHandler(userID, request.id, "denied")} />
          </View>
        ))}
      </View>

      <View>
        {currentFriends.map((friendData) => (
          <View style={ScreenStyle.friendStatusContainer} key={friendData.id}>
            <Text>Friends with {friendData.displayName}</Text>
            <Button
              title="Remove Friend"
              onPress={() => {
                friendRequestResponseHandler(userID, friendData.id, "remove");
              }}
            />
          </View>
        ))}
      </View>
      <View>
        {deniedFriends.map((friendData) => (
          <View style={ScreenStyle.friendStatusContainer} key={friendData.id}>
            <Text>Denied friend request from {friendData.displayName}</Text>
            <Button
              title="Remove"
              onPress={() => {
                friendRequestResponseHandler(userID, friendData.id, "remove");
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
