import { useContext, useEffect } from 'react'
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
	DrawerContentComponentProps
} from '@react-navigation/drawer'

import HomeScreen from "../../screens/HomeScreen";
import { Colors } from "../../constants/colors";
import FriendsScreen from "../../screens/friends/FriendsScreen";
import { AuthContext } from "../../context/auth/AuthProvider";
import ProfileScreen from "../../screens/authScreens/ProfileScreen";
import UpdateStatsScreen from "../../screens/liftStats/UpdateLiftsScreen";
import LiftHistoryScreen from "../../screens/liftStats/LiftHistoryScreen";
import LiftGraphScreen from "../../screens/liftStats/LiftGraphScreen";
import saveTokenToDatabase from '../messaging/SaveTokenToDatabase';
import messaging from "@react-native-firebase/messaging";


const Drawer = createDrawerNavigator()



function CustomDrawerContent(props: DrawerContentComponentProps) {
	const { logout } = useContext(AuthContext)
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label="Logout" onPress={logout} />
		</DrawerContentScrollView>
	)
}

export default function HomeStack() {
	const { user } = useContext(AuthContext);
	const getDeviceToken = async () => {
		console.log("🚀 ~ file: Routes.tsx:24 ~ getDeviceToken ~ getDeviceToken:")
		messaging()
			.getToken()
			.then((token) => {
				return saveTokenToDatabase(token, user?.uid);
			});

		// If using other push notification providers (ie Amazon SNS, etc)
		// you may need to get the APNs token instead for iOS:
		// if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

		// Listen to whether the token changes
		return messaging().onTokenRefresh((token) => {
			saveTokenToDatabase(token, user?.uid);
		});
	};

	useEffect(() => {
		getDeviceToken();
	}, []);

	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primaryDark },
				headerTintColor: 'white',
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Profile" component={ProfileScreen} />
			<Drawer.Screen name="Friends" component={FriendsScreen} />
			<Drawer.Screen name="UpdateStats" component={UpdateStatsScreen} />
			<Drawer.Screen name="Stats History" component={LiftHistoryScreen} />
			<Drawer.Screen name="Stats Graph" component={LiftGraphScreen} />
		</Drawer.Navigator>
	)
}
