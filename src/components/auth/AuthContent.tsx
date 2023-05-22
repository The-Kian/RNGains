

import { Alert, View } from "react-native";
import { useContext, useState } from "react";

import { CredentialsType } from "./AuthTypes";
import { AuthProps } from "./AuthTypes";
import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { buttonStyles, ScreenStyle } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { authScreenProp } from "./AuthTypes";
import { AuthContext } from "./AuthProvider";


function AuthContent({ authScreenType, onSubmit }: AuthProps) {

  const navigation = useNavigation<authScreenProp>()

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
  if (authScreenType == "login") {
      navigation.replace("SignUp");
    } else if (authScreenType =="signUp") {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials: CredentialsType) {
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
    <View style={ScreenStyle.authContent}>
      <AuthForm
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        authScreenType={authScreenType}
      />
      <View>
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


