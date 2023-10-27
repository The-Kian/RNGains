import { useContext } from "react";
import { Text, View } from "react-native";

import { AuthContext } from "../context/auth/AuthProvider";
import { ScreenStyle } from "../constants/styles/screenStyles";
import { NotificationTestScreen } from "./notification/Notification";

function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={ScreenStyle.rootContainer}>
      <Text style={ScreenStyle.title}>Welcome!</Text>
      <Text style={ScreenStyle.welcomeText}>Logged in {user.displayName} </Text>
	  <NotificationTestScreen/>
    </View>
  );
}

export default HomeScreen;
