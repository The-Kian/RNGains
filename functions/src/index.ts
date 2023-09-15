import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


// Deploy with `firebase deploy --only functions`
admin.initializeApp();

export const sendFriendRequestNotification = functions.firestore
  .document("users/{userID}/friends/{friendID}")
  .onCreate(async (snap, context) => {
    const userID = context.params.userID;
    const friendID = context.params.friendID;

    // const userRef = admin.firestore().collection("users").doc(userID);
    const friendRef = admin.firestore().collection("users").doc(friendID);

    // const userDoc = await userRef.get();
    const friendDoc = await friendRef.get();

    const getMessaging = admin.messaging();
    const foregroundPayload = {
      data: {
        type: "friendRequest",
        userID: userID,
        friendID: friendID,
      },
      notification: {
        title: "New Friend Request",
        body: "You have received a new friend request",
      },
      token: friendDoc.data()?.tokens[0] as string,
    };


    const backgroundPayload = {
      data: {
        type: "friendRequest",
        userID: userID,
        friendID: friendID,
      },
      token: friendDoc.data()?.tokens[0] as string,
    };

    const sendForegroundMessage = async () => {
      await getMessaging
        .send(foregroundPayload)
        .then((response) => {
          console.log("🚀 ~ file: index.ts:33 ~ response:", response);
        })
        .catch((error) => {
          console.log("🚀 ~ file: index.ts:35 ~ error:", error);
        });
    };

    const sendBackgroundMessage = async () => {
      // eslint-disable-next-line max-len
      console.log("🚀 ~ file: index.ts:51 ~ sendBackgroundMessage ~ sendBackgroundMessage:");
      await getMessaging
        .send(backgroundPayload)
        .then((response) => {
          console.log("🚀 ~ file: index.ts:56 ~ response:", response);
        })
        .catch((error) => {
          console.log("🚀 ~ file: index.ts:3595 ~ error:", error);
        });
    };

    await sendForegroundMessage();
    await sendBackgroundMessage();
  });
