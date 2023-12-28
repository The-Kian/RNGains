import { useNavigation } from "@react-navigation/native";
import { View, Button, Text } from "react-native";

export const FeatureTestScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hi</Text>
      <Button
        title="Navigate to friends feed view"
        onPress={() => navigation.navigate('FriendsTab', { screen: 'FriendsScreen', params: { activeView: 'friendRequests' } })}
      />
    </View>
  );
};
