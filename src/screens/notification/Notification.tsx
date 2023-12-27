import { View, Button, Text } from "react-native";

import onDisplayNotifciation from "../../utils/displayNotification";

export const NotificationTestScreen = () => {


  return (
    <View>
      <Text>Hi</Text>
      <Button title="Display Notification" onPress={onDisplayNotifciation} />
    </View>
  );
};
