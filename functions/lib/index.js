"use strict";
/* eslint-disable max-len */
// Deploy with `firebase deploy --only functions`
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFriendRequestNotification = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.sendFriendRequestNotification = functions.firestore
    .document("users/{userID}/friends/{friendID}")
    .onWrite(async (change, context) => {
    var _a, _b;
    const userID = context.params.userID;
    const friendID = context.params.friendID;
    const friendRef = admin.firestore().collection("users").doc(friendID);
    const friendDoc = await friendRef.get();
    const getMessaging = admin.messaging();
    const newStatus = (_a = change.after.data()) === null || _a === void 0 ? void 0 : _a.status;
    const token = (_b = friendDoc.data()) === null || _b === void 0 ? void 0 : _b.token;
    const payload = {
        data: {
            type: `friend request ${newStatus}`,
            userID,
            friendID,
        },
        token,
    };
    try {
        const response = await getMessaging.send(payload);
        console.log("🚀 ~ file: index.ts:30 ~ .onCreate Notification response:", response);
    }
    catch (error) {
        console.log("🚀 ~ file: index.ts:30 ~ .onCreate Error sending notification:", error);
    }
});
//# sourceMappingURL=index.js.map