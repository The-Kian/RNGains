import { useNavigation } from "@react-navigation/native";
import { View, Button, Text } from "react-native";

export const NotificationTestScreen = () => {

  const navigation = useNavigation();
  return (
    <View>
      <Text>Hi</Text>
      <Button title="Navigate to friends feed view" onPress={() => navigation.navigate("FriendsScreen")} />
    </View>
  );
};
