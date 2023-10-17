/* eslint-disable max-len */
// Deploy with `firebase deploy --only functions`

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendFriendRequestNotification = functions.firestore
  .document("users/{userID}/friends/{friendID}")
  .onCreate(async (snap, context) => {
    const userID = context.params.userID;
    const friendID = context.params.friendID;

    const friendRef = admin.firestore().collection("users").doc(friendID);
    const friendDoc = await friendRef.get();

    const getMessaging = admin.messaging();

    const payload = {
      data: {
        type: "friendRequest",
        userID,
        friendID,
      },
      token: friendDoc.data()?.tokens[0] as string,
    };

    try {
      const response = await getMessaging.send(payload);
      console.log("🚀 ~ file: index.ts:30 ~ .onCreate Notification response:", response);
    } catch (error) {
      console.log("🚀 ~ file: index.ts:30 ~ .onCreate Error sending notification:", error);
    }
  });
