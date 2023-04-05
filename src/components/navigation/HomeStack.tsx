import { ReactNode, RefAttributes, useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps
} from "@react-navigation/drawer";

import HomeScreen from "../../screens/HomeScreen";
import { Colors } from "../../constants/colors";
import FriendsScreen from "../../screens/FriendsScreen";
import { AuthContext } from "../../context/AuthProvider";
import ProfileScreen from "../../screens/ProfileScreen";
import UpdateStatsScreen from "../../screens/UpdateStatsScreen";

const Drawer = createDrawerNavigator();



function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
}

export default function HomeStack() {

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryDark },
        headerTintColor: "white",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="UpdateStats" component={UpdateStatsScreen} />
    </Drawer.Navigator>
  );
}
