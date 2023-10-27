import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { Alert } from "react-native";

interface RemoteMessageData {
  friendID: string;
  newStatus: string;
  type: string;
}

const friendRequestNotificationHandler = async (friendID: string, newStatus: string) => {
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: "Friend Request",
    body: `Friend Request from ${friendID} with status ${newStatus}`,
    android: {
      channelId,
    },
  });

  Alert.alert(`Friend Request from ${friendID} with status ${newStatus}`);
};

// Set background message handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const { friendID, newStatus, type } = remoteMessage.data as unknown as RemoteMessageData;
  if (type === "friendRequest") {
    await friendRequestNotificationHandler(friendID, newStatus);
  }
});

export const NotificationReceiver = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data) {
        const { friendID, newStatus, type } = remoteMessage.data as unknown as RemoteMessageData;
        if (type === "friendRequest") {
          await friendRequestNotificationHandler(friendID, newStatus);
        }
      }
    });

    return unsubscribe; // unsubscribe on unmount
  }, []);

  return null; // Render nothing, we only need the side-effect (notification handling)
};
