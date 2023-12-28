import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from "@notifee/react-native";
import App from "./App";
import { BackgroundNotificationHandler } from "./src/components/messaging/FriendRequestNotificationHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log("🚀 Background Event Type:", type, "Detail:", detail);

  if (type === EventType.ACTION_PRESS && detail?.pressAction?.id === 'view') {
    console.log("🚀 ~ file: index.js:16 ~ notifee.onBackgroundEvent user pressed view")
    await AsyncStorage.setItem(
      "navigateToScreen",
      JSON.stringify({ screen: "FriendsScreen", params: { activeView: "friendRequests" } }),
    );
  }
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  BackgroundNotificationHandler(remoteMessage);
});
registerRootComponent(App);
