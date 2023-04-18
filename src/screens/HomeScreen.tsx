

import { useContext } from 'react';
import { Text, View } from 'react-native';

import { AuthContext } from '../components/auth/AuthProvider';
import { screenStyle } from '../constants/styles';

function HomeScreen() {

  const {user} = useContext(AuthContext);

  return (
    <View style={screenStyle.rootContainer}>
      <Text style={screenStyle.title}>Welcome!</Text>
      <Text style={screenStyle.welcomeText} >Logged in {user.displayName} </Text>

    </View>
  );
}

export default HomeScreen;
