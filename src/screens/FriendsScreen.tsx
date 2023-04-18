


import { Text, View } from 'react-native';
import { screenStyle } from '../constants/styles';

export default function FriendsScreen() {

  return (
    <View style={screenStyle.rootContainer}>
      <Text style={screenStyle.title}>No friends!</Text>

    </View>
  );
}
