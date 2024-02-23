import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { UserStatsProvider } from "../../context/userStats/UserStatsProvider";

import { ForegoundNotificationReceiver } from "../messaging/FriendRequestNotificationHandler";
import AppTabs from "./AppTabs";
import LoadingOverlay from "../../screens/LoadingOverlay";
import * as Linking from "expo-linking";

export default function Routes() {
  const { user, initializing } = useContext(AuthContext);

  const prefix = Linking.createURL('/');
  
  const linking = {
    prefixes: [prefix, 'rngains://'],
    config: {
      screens: {
        Home: 'home',
        FriendsTab: {
          path: 'friends',
          screens: {
            FriendsScreen: ':activeView',
          },
        },
      },
    },
  };

  if (initializing) return <LoadingOverlay message="Loading"></LoadingOverlay>;

  return (
    <>
      <NavigationContainer linking={linking}>
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
