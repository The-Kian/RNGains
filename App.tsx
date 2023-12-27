import Providers from "./src/context/navigation/NavigationProviders";
import { PermissionsAndroid } from "react-native";

export default function App() {
  console.log("app launched");
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  return <Providers />;
}
