import saveTokenToDatabase from "./SaveTokenToDatabase";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getDeviceToken(userID: string, setToken: (token: string) => void) {

  try {
    const newToken = await messaging().getToken();
    const currentToken = await AsyncStorage.getItem('deviceToken');

    if (newToken !== currentToken) {
      saveTokenToDatabase(newToken, userID);
      setToken(newToken);
      await AsyncStorage.setItem('deviceToken', newToken);
    }
  } catch (error) {
    console.log("🚀 ~ file: GetToken.ts ~ getDeviceToken ~ error", error);
  }
}
