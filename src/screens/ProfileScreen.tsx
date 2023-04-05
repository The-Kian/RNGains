import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthProvider";
import { credentialsType } from "../components/auth/AuthForm";
import AuthContent from "../components/auth/AuthContent";

export default function ProfileScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { update } = useContext(AuthContext);

  async function updateProfileHandler(displayName: string) {
    setIsAuthenticating(true);
    await update({ displayName });
    setIsAuthenticating(false);
  }

  return (
    <View style={styles.rootContainer}>
      <AuthContent
        authScreenType="update"
        onSubmit={(credentials: credentialsType) => {
          updateProfileHandler(credentials.displayName)
        }}
        credentialsInvalid={{
          email: false,
          confirmEmail: false,
          password: false,
          confirmPassword: false,
        }} ></AuthContent>

    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  welcomeText: {
    padding: 6,
  },
});
