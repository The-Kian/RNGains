import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsScreen from "../../screens/friends/FriendsScreen";

const Stack = createNativeStackNavigator();

function FriendsStack() {
  return (
    <Stack.Navigator initialRouteName="FriendsScreen">
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
    </Stack.Navigator>
  );
}

export default FriendsStack;
