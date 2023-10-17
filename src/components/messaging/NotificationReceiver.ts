import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

const NotificationReceiver = () => {
	useEffect(() => {
		const unsubscribe = messaging().onMessage((remoteMessage) => {
			console.log("🚀 ~ file: NotificationReceiver.ts:8 ~ unsubscribe ~ remoteMessage:", remoteMessage)
			// Handle the foreground notification
			
			NotificationHandler();
		});

		return unsubscribe; // unsubscribe on unmount
	}, []);

	return null; // Render nothing, we only need the side-effect (notification handling)
};

const NotificationHandler = () => {
	Alert.alert(
		"Notification",
		"Notification received",
		[
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{ text: "OK", onPress: () => console.log("OK Pressed") },
		],
		{ cancelable: false }
	);
}

export default NotificationReceiver;
