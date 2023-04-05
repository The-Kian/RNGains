import React from "react";
import { useState, ReactNode, createContext } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { enableExpoCliLogging } from "expo/build/logs/Logs";

export const AuthContext = createContext<{
  user: null | any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: (props: { email: string; password: string }) => Promise<void>;
  register: (props: { email: string; password: string }) => Promise<void>;
  update: (props: { displayName: string }) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  setUser: () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  update: async () => {},
});

type authProviderProps = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: authProviderProps) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async ({ email, password }) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error.code);
            if (error.code === "auth/user-not-found") {
              console.log(error.code);
              Alert.alert("User not found");
            }
          }
        },
        register: async ({ email, password }) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
              Alert.alert("That email address is already in use!");
            }

            if (error.code === "auth/invalid-email") {
              Alert.alert("That email address is invalid!");
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            Alert.alert(error);
          }
        },
        update: async ({displayName}) => {
          console.log(displayName)
          try {
            await auth().currentUser?.updateProfile({
              displayName: displayName
            })
          } catch (error) {
            Alert.alert(error)
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
