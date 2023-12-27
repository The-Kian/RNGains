import firestore from "@react-native-firebase/firestore";

async function saveTokenToDatabase(token: string, userID: string) {
  try {
    console.log(`🚀 ~ file: SaveTokenToDatabase.ts:6 ~ saveTokenToDatabase ~ userID: ${userID}`);

    const userRef = firestore().collection("users").doc(userID);
    await userRef.update({ token });

    console.log("🚀 ~ file: SaveTokenToDatabase.ts:15 ~ saveTokenToDatabase ~ token saved to database");
  } catch (error) {
    console.log("🚀 ~ file: SaveTokenToDatabase.ts:15 ~ saveTokenToDatabase ~ error:", error.code);
  }
}

export default saveTokenToDatabase;
