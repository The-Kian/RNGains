import { useEffect } from "react";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface RemoteMessageData {
  displayName: string;
  newStatus: string;
  type: string;
}

const friendRequestNotificationHandler = async (displayName: string, newStatus: string, navigation?: any) => {

  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
  });

  let notificationTitle;
  let notificationBody;

  switch (newStatus) {
  case "requested":
    notificationTitle = "New Friend Request";
    notificationBody = `You have received a new friend request from ${displayName}.`;
    break;
  case "accepted":
    notificationTitle = "Friend Request Accepted";
    notificationBody = `${displayName} has accepted your friend request.`;
    break;
  case "denied":
    notificationTitle = "Friend Request Denied";
    notificationBody = `${displayName} has denied your friend request.`;
    break;
  default:
    // Log for debugging
    console.log(`Unhandled status: ${newStatus}`);
    notificationTitle = "Friend Request Notification";
    notificationBody = `There's a new update regarding your friend request with ${displayName}.`;
  }

  await notifee.displayNotification({
    title: notificationTitle,
    body: notificationBody,
    android: {
      channelId,
      actions:
        newStatus === "received"
          ? [
            {
              title: "View",
              pressAction: { id: "view" },
            },
          ]
          : [],
    },
  });

  Alert.alert(notificationTitle, notificationBody, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
    ...(newStatus === "received"
      ? [
        {
          text: "View",
          onPress: () => {
            navigation.navigate('FriendRequests');
          },
        },
      ]
      : []),
  ]);
};

export const ForegoundNotificationReceiver = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data) {
        const { displayName, newStatus, type } = remoteMessage.data as unknown as RemoteMessageData;
        if (type === "friendRequest") {
          await friendRequestNotificationHandler(displayName, newStatus);
        }
      }
    });

    return unsubscribe;
  }, []);

  return null;
};

export const BackgroundNotificationHandler = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  console.log("Received a background message", remoteMessage);
  // Extract data and determine if it's a friend request
  const { displayName, newStatus, type } = remoteMessage.data as unknown as RemoteMessageData;
  if (type === "friendRequest") {
    // Call the existing handler to process the notification
    await friendRequestNotificationHandler(displayName, newStatus);
  }
};
