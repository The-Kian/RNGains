/* eslint-disable max-len */
// Deploy with `firebase deploy --only functions`

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendFriendRequestNotification = functions.firestore
  .document("users/{userID}/friends/{friendID}")
  .onWrite(async (change, context) => {
    const userID = context.params.userID;
    const friendID = context.params.friendID;

    const friendRef = admin.firestore().collection("users").doc(friendID);
    const friendDoc = await friendRef.get();

    const getMessaging = admin.messaging();

    const newStatus = change.after.data()?.status;

    const token = friendDoc.data()?.token;
    const payload = {
      data: {
        type: "friendRequest",
        userID,
        friendID,
        newStatus,
      },
      token,
    };

    try {
      const response = await getMessaging.send(payload);
      console.log("🚀 ~ file: index.ts:30 ~ .onCreate Notification response:", response);
    } catch (error) {
      console.log("🚀 ~ file: index.ts:30 ~ .onCreate Error sending notification:", error);
    }
  });

