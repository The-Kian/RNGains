import notifee, { AuthorizationStatus } from "@notifee/react-native";
import { Alert } from "react-native";

export default async function onDisplayNotification() {
  const permissionStatus = await notifee.requestPermission();
  Alert.alert("hi");

  if (permissionStatus.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
    Alert.alert("Permission denied", "You need to grant notification permissions to receive notifications.");
    return;
  }

  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });

  await notifee.displayNotification({
    title: "Test Notification",
    body: "This is a test notification",
    android: {
      channelId,
      pressAction: {
        id: "default",
      },
    },
  });
  console.log("hi");
}
