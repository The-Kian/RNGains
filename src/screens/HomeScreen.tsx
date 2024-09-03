import { useContext } from "react";
import { Platform, Text, View } from "react-native";

import { AuthContext } from "../context/auth/AuthProvider";
import { ScreenStyle } from "../constants/styles/screenStyles";
import { FeatureTestScreen } from "./notification/TestButton";
import NotificationTestButton from "../components/messaging/NotificationTestButton";

function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={ScreenStyle.rootContainer}>
      <Text style={ScreenStyle.title}>Welcome!</Text>
      <Text style={ScreenStyle.welcomeText}>Logged in {user.displayName} </Text>
	  <FeatureTestScreen/>
    {Platform.OS === "ios" && <NotificationTestButton />}
    </View>
  );
}

export default HomeScreen;
