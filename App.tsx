import { useEffect } from "react";
import Providers from "./src/context/navigation/NavigationProviders";
import { PermissionsAndroid, Platform, NativeModules } from "react-native";

const { NotificationServiceBridge } = NativeModules;


export default function App() {
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    } else if (Platform.OS === "ios") {
      if (NotificationServiceBridge) {
        console.log(`🚀 ~ useEffect ~ NotificationServiceBridge.requestAuthorization`)
        NotificationServiceBridge.requestAuthorization(); // Corrected method name
      } else {
        console.error("NotificationServiceBridge is not initialized");
      }
    }
  }, []);
  return <Providers />;
}
