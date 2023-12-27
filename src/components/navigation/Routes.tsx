import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";

import LoadingOverlay from "../../screens/LoadingOverlay";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { UserStatsProvider } from "../../context/userStats/UserStatsProvider";

import { ForegoundNotificationReceiver } from "../messaging/FriendRequestNotificationHandler";
import AppTabs from "./AppTabs";

export default function Routes() {
  const { user, initializing } = useContext(AuthContext);

  if (initializing) return <LoadingOverlay message="Loading"></LoadingOverlay>;

  return (
    <>
      <ForegoundNotificationReceiver />
      <NavigationContainer>
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
