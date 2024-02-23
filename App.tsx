import Providers from "./src/context/navigation/NavigationProviders";
import { PermissionsAndroid } from "react-native";

export default function App() {

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  return <Providers />;
}
