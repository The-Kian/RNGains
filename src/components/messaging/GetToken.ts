import saveTokenToDatabase from "./SaveTokenToDatabase";
import messaging from "@react-native-firebase/messaging";

export const getDeviceToken = async (userID:string) => {

	console.log("🚀 ~ file: Routes.tsx:24 ~ getDeviceToken ~ getDeviceToken:");
	messaging()
		.getToken()
		.then((token) => {
			return saveTokenToDatabase(token, userID);
		});

	// If using other push notification providers (ie Amazon SNS, etc)
	// you may need to get the APNs token instead for iOS:
	// if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

	// Listen to whether the token changes
	return messaging().onTokenRefresh((token) => {
		saveTokenToDatabase(token,userID);
	});
};
