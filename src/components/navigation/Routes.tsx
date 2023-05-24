import  { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import auth from "@react-native-firebase/auth";

import HomeStack from "./HomeStack";
import LoadingOverlay from "../../screens/LoadingOverlay";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { UserStatsProvider } from "../firestore/UserStatsProvider";

export default function Routes() {
  const { user, setUser, login, register, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: null | any) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <LoadingOverlay message="Loading"></LoadingOverlay>;

  return <NavigationContainer>
    {user ? 
    <UserStatsProvider>
      <HomeStack/>
    </UserStatsProvider>   :<AuthStack/>}
      
  </NavigationContainer>;
}
