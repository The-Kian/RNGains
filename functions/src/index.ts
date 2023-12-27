import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendFriendRequestNotification = functions.firestore
  .document("users/{userID}/friends/{friendID}")
  .onWrite(async (change, context) => {
    const {userID, friendID} = context.params;

    const friendRef = admin.firestore().collection("users").doc(friendID);
    const friendDoc = await friendRef.get();

    if (!friendDoc.exists || !friendDoc.data()?.token) {
      console.log(`No token found for user: ${friendID}`);
      return;
    }

    const token = friendDoc.data()?.token;
    console.log(`Token for user ${friendID}: ${token}`);

    const newStatus = change.after.data()?.status;
    const displayName = friendDoc.data()?.displayName;

    if (!displayName) {
      console.log(`No username found for user: ${friendID}`);
      return;
    }

    if (newStatus === undefined) {
      console.log(`Status is undefined for user: ${friendID}`);
      return;
    }

    const payload = {
      data: {
        type: "friendRequest",
        userID,
        friendID,
        newStatus,
        displayName,
      },
      token,
    };

    try {
      const response = await admin.messaging().send(payload);
      console.log("Notification response:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });
