import React from 'react';
import FlatButton from '../ui/FlatButton';
import { friendRequestNotificationHandler } from './FriendRequestNotificationHandler';

const NotificationTestButton = () => {
  return (
    <FlatButton onPress={() => friendRequestNotificationHandler("displayName", "requested")}>
      Test Notification
    </FlatButton>
  );
};

export default NotificationTestButton;