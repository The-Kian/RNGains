import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";
import auth, { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";

import HomeStack from "./HomeStack";
import LoadingOverlay from "../../screens/LoadingOverlay";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { UserStatsProvider } from "../../context/userStats/UserStatsProvider";
import messaging from "@react-native-firebase/messaging";
import saveTokenToDatabase from "../messaging/SaveTokenToDatabase";
import NotificationReceiver from "../messaging/NotificationReceiver";

export default function Routes() {
	const { user, setUser } = useContext(AuthContext);
	const [initializing, setInitializing] = useState(true);

	function onAuthStateChanged(user: null | FirebaseAuthTypes.User) {
		setUser(user as FirebaseAuthTypes.User);
		firebase.messaging().deleteToken();
		if (initializing) setInitializing(false);
	}

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
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		getDeviceToken();
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return <LoadingOverlay message="Loading"></LoadingOverlay>;

	return (
		<>
			<NotificationReceiver />
			<NavigationContainer>
				{user ? (
					<UserStatsProvider>
						<HomeStack />
					</UserStatsProvider>
				) : (
					<AuthStack />
				)}
			</NavigationContainer>
		</>
	);
}
