import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

type credentialsInvalidType = {
  email: boolean;
  confirmEmail: boolean;
  password: boolean;
  confirmPassword: boolean;
};

export type credentialsType = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
};

export type authProps = {
  authScreenType: "login" | "signUp" | "update";
  onSubmit: (credentials: credentialsType) => void;
  credentialsInvalid: credentialsInvalidType;
};

export const AuthForm: React.FC<authProps> = ({
  authScreenType, onSubmit, credentialsInvalid }) =>
  {
  const [enteredEmail, setEnteredEmail] = useState("test@test.com");
  const [enteredConfirmEmail, setEnteredConfirmEmail] =
    useState("test@test.com");
  const [enteredPassword, setEnteredPassword] = useState("password");
  const [enteredConfirmPassword, setEnteredConfirmPassword] =
    useState("password");

  const [enteredDisplayName, setEnteredDisplayName] = useState("Test");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "displayName":
        setEnteredDisplayName(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      displayName: enteredDisplayName
    });
  }

  return (
    <View
      style={
        {
          /*styles.form*/
        }
      }
    >
      <View>
      {authScreenType !== "update" && ( 
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
      )}
        {authScreenType == "signUp" && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
      {authScreenType == "update" && (      
        <Input
          label="Display Name"
          onUpdateValue={updateInputValueHandler.bind(this, "displayName")}
          value={enteredDisplayName}
          isInvalid={false}
        />
        )}
      <Input
            label="Password"
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
          />
        {authScreenType == "signUp" && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {authScreenType === "login"
              ? "Log In"
              : authScreenType === "signUp"
              ? "Sign Up"
              : "Update details"}
          </Button>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
