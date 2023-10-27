import notifee from "@notifee/react-native";
import { Alert } from "react-native";

export default async function onDisplayNotifciation() {
  // await notifee.requestPermission();
  Alert.alert("hi");

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
