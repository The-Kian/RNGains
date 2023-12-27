import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Alert } from "react-native";

interface friendRequestProps {
  userID: string;
  friendID: string;
  response: string;
}

interface AddFriendRequestToUserProps {
  batch: FirebaseFirestoreTypes.WriteBatch;
  userID: string;
  friendID: string;
  status: string;
}

const addFriendRequestToUser = ({ batch, userID, friendID, status }: AddFriendRequestToUserProps) => {
  const userFriendsRef = firestore().collection("users").doc(userID).collection("friends").doc(friendID);
  batch.set(userFriendsRef, {
    friendID: friendID,
    status: status,
    timestamp: firestore.FieldValue.serverTimestamp(),
  });
};

export const sendFriendRequest = async ({ userID, friendID }: friendRequestProps) => {
  const batch = firestore().batch();

  addFriendRequestToUser({
    batch,
    userID,
    friendID,
    status: "requested",
  });

  addFriendRequestToUser({
    batch,
    userID: friendID,
    friendID: userID,
    status: "received",
  });

  return batch
    .commit()
    .catch((error) => {
      Alert.alert(error.message);
    });
};

export const respondToFriendRequest = async ({ userID, friendID, response }: friendRequestProps) => {
  const batch = firestore().batch();
  if (response === "remove") {
    const userFriendsRef = firestore().collection("users").doc(userID).collection("friends").doc(friendID);
    const friendFriendsRef = firestore().collection("users").doc(friendID).collection("friends").doc(userID);
    batch.delete(userFriendsRef);
    batch.delete(friendFriendsRef);

    return batch
      .commit()
      .then(() => {
        // Alert.alert("Friend removed");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  } else {
    addFriendRequestToUser({
      batch,
      userID,
      friendID,
      status: response,
    });

    addFriendRequestToUser({
      batch,
      userID: friendID,
      friendID: userID,
      status: response,
    });

    return batch
      .commit()
      .catch((error) => {
        Alert.alert(error.message);
      });
  }
};
