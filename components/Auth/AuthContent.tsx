import { useNavigation, ParamListBase } from "@react-navigation/native";


import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";

import { Colors } from "../../constants/colors";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";

function AuthContent(props: { isLogin?: boolean; onAuthenticate: (email: string, password: string) => void }) {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  type credentialsType = {
    email: string
    confirmEmail: string
    password: string
    confirmPassword: string 
  }

  function switchAuthModeHandler() {
    if (props.isLogin) {
      navigation.replace('Signup')
    } else {
      navigation.replace('Login')
    }
  }

  function submitHandler(credentials: credentialsType) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!props.isLogin && (!emailsAreEqual || !passwordsAreEqual))
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
    props.onAuthenticate(email, password);
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={props.isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {props.isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
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


