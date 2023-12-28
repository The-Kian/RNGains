import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";

import LoadingOverlay from "../../screens/LoadingOverlay";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { UserStatsProvider } from "../../context/userStats/UserStatsProvider";

import { ForegoundNotificationReceiver } from "../messaging/FriendRequestNotificationHandler";
import AppTabs from "./AppTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    console.log("🚀 ~ file: Routes.tsx:17 ~ navigate ~ isReady:")
    navigationRef.navigate(name, params);
  }
}

export default function Routes() {
  console.log("🚀 ~ file: Routes.tsx:23 ~ Routes ~ Routes: Mounted")
  const { user } = useContext(AuthContext);

  

  
  const checkForNavigation = async () => {
    // console.log("🚀 ~ file: Routes.tsx:30 ~ checkForNavigation ~ checkForNavigation:")
    const navigationData = await AsyncStorage.getItem("navigateToScreen");
    console.log("🚀 ~ file: Routes.tsx:32 ~ checkForNavigation ~ navigationData:", navigationData)
    if (navigationData) {
      const { screen, params } = JSON.parse(navigationData);
      if (screen == "FriendsScreen") {
        navigate("FriendsTab", { screen, params: { activeView: params.activeView } });
      }
      await AsyncStorage.removeItem("navigateToScreen");
    }
  };
  checkForNavigation();
  useEffect(() => {
    console.log("🚀 ~ file: Routes.tsx:28 ~ useEffect ~ useEffect:")
    const unsubscribe = navigationRef.addListener("state", checkForNavigation);
    
    return unsubscribe;
  }, []);

  // if (initializing) return <LoadingOverlay message="Loading"></LoadingOverlay>;

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <ForegoundNotificationReceiver />
        {user ? (
          <UserStatsProvider>
            <AppTabs />
          </UserStatsProvider>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </>
  );
}
