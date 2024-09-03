import { useEffect } from "react";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

interface RemoteMessageData {
  displayName: string;
  newStatus: string;
  type: string;
}

export const friendRequestNotificationHandler = async (displayName: string, newStatus: string) => {
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
        newStatus === "requested" ? [{ title: "View", pressAction: { id: "navigateToFriendRequests", launchActivity: "default" } }] : [],
    },
    ios: {
      sound: "default",
      categoryId: "friendRequest",
    },
  });

  await notifee.setNotificationCategories([
    {
      id: 'friendRequest',
      actions: newStatus === "requested" ? [
        { id: "navigateToFriendRequests", title: "View", foreground: true }
      ] : [],
    },
  ]);

};

export const ForegoundNotificationReceiver = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const onMessageUnsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data) {
        await notifee.requestPermission();
        console.log(`🚀 ~ onMessageUnsubscribe ~ remoteMessage:`, remoteMessage)
        const { displayName, newStatus, type } = remoteMessage.data as unknown as RemoteMessageData;
        if (type === "friendRequest") {
          await friendRequestNotificationHandler(displayName, newStatus);
        }
      }
    });

    const onNotificationInteractionUnsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      console.log("🚀 Foreground Event Type:", type, "Detail:", detail);
      
      if ((type === EventType.PRESS && Platform.OS == 'ios') || ( EventType.ACTION_PRESS && detail?.pressAction?.id === "navigateToFriendRequests")) {
        console.log("🚀 ~ file: FriendRequestNotificationHandler.ts:68: navigating to freindrequests");

        navigation.navigate("FriendsTab", { screen: "FriendsScreen", params: { activeView: "friendRequests" } });
      }
    });
    return () => {
      onMessageUnsubscribe();
      onNotificationInteractionUnsubscribe();
    };
  }, [navigation]);

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
