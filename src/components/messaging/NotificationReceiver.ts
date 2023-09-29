// NotificationHandler.tsx
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

const NotificationReceiver = () => {
	useEffect(() => {
		const unsubscribe = messaging().onMessage((remoteMessage) => {
			// Handle the foreground notification
			console.log("Notification received:", remoteMessage);
			Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
		});

		return unsubscribe; // unsubscribe on unmount
	}, []);

	return null; // Render nothing, we only need the side-effect (notification handling)
};

export default NotificationReceiver;
