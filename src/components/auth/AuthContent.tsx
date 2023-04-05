import { useNavigation, ParamListBase } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";

import { Colors } from "../../constants/colors";

import FlatButton from "../ui/FlatButton";
import { AuthForm, credentialsType, authProps } from "./AuthForm";

function AuthContent({ authScreenType, onSubmit }: authProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
  if (authScreenType == "login") {
      navigation.replace("Signup");
    } else if (authScreenType =="signUp") {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials: credentialsType) {
    let { email, confirmEmail, password, confirmPassword, displayName } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (authScreenType == "signUp" && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onSubmit(credentials)
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        authScreenType={authScreenType}
      />
      <View style={styles.buttons}>
        {authScreenType !== "update" &&(
          <FlatButton onPress={switchAuthModeHandler}>
            {authScreenType === "login" ? "Create a new user" : "Login instead"}
          </FlatButton>
        )}
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryDark,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
