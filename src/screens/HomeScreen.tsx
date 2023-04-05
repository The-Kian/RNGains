

import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../context/AuthProvider';

function HomeScreen() {

  const {user} = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.welcomeText} >Logged in {user.displayName} </Text>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeText: {
    padding: 6
  }
});