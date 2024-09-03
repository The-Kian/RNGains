import Providers from "./src/context/navigation/NavigationProviders";
import { PermissionsAndroid, Platform } from "react-native";

export default function App() {

  if (Platform.OS === "android") {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  } else if (Platform.OS === "ios") {
    // iOS permissions
    
  }
  return <Providers />;
}
