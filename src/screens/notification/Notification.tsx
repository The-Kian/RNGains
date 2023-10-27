import { View, Button, Text, Alert } from "react-native";

import notifee from "@notifee/react-native";

export const NotificationTestScreen = () => {
  async function onDisplayNotifciation() {
    // await notifee.requestPermission();
    console.log('hi');
    Alert.alert('hi');

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
    console.log('hi');
  }

  return (
    <View>
      <Text>Hi</Text>
      <Button title="Display Notification" onPress={onDisplayNotifciation} />
    </View>
  );
};
