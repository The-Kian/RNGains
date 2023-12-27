import saveTokenToDatabase from "./SaveTokenToDatabase";
import messaging from "@react-native-firebase/messaging";

export function getDeviceToken(userID: string, setToken: (token: string) => void) {
  console.log("🚀 ~ file: GetToken.ts:6 ~ getDeviceToken ~ getDeviceToken:");

  try {
    messaging()
      .getToken()
      .then((token) => {
        saveTokenToDatabase(token, userID);
        setToken(token);
      });
  } catch (error) {
    console.log("🚀 ~ file: GetToken.ts ~ getDeviceToken ~ error", error);
  }
}
