import { useState, createContext, useEffect } from "react";
import { Alert } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ProviderProps } from "../../constants/genericTypes";
import { AuthContextType, defaultAuthContext } from "./AuthTypes";
import removeTokenFromDatabase from "../../components/messaging/RemoveTokenFromDatabase";
import { getDeviceToken } from "../../components/messaging/GetDeviceToken";

export const AuthContext = createContext(defaultAuthContext);

export function AuthProvider({ children }: ProviderProps): JSX.Element {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string>("");
  const [initializing, setInitializing] = useState<boolean>(true);
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (userState) {
        getDeviceToken(userState.uid, setToken);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Unsubscribe on unmount
    return () => subscriber();
  }, []);


  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("User not found");
      }
    }
    console.log("🚀 ~ file: AuthProvider.tsx:46 ~ AuthProvider ~ login:");
  };

  const register = async ({ email, password }: { email: string; password: string }): Promise<void> => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await firestore()
        .collection("users")
        .doc(user?.uid)
        .set({
          displayName: user?.displayName ?? email,
          email: email,
        });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("That email address is already in use!");
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("That email address is invalid!");
      }
    }
  };

  const update = async ({ displayName }: { displayName: string }) => {
    const user = auth().currentUser;
    if (user) {
      try {
        await user.updateProfile({
          displayName: displayName,
        });
      } catch (error) {
        Alert.alert(error);
      }
      try {
        await firestore()
          .collection("users")
          .doc(user.uid)
          .set(
            {
              displayName: displayName ?? user?.email,
              email: user.email,
            },
            { merge: true },
          );
      } catch (error) {
        Alert.alert(error);
      } finally {
        setUser(auth().currentUser);
      }
    }
  };

  const logout = async () => {
    try {
      await removeTokenFromDatabase(token, user.uid);
      await firebase.messaging().deleteToken();
      await auth().signOut();
      console.log("🚀 ~ file: AuthProvider.tsx:116 ~ logout ~ logout:");
    } catch (error) {
      Alert.alert(error);
    }
  };

  const value: AuthContextType = {
    initializing,
    user,
    setUser,
    login,
    register,
    logout,
    update,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
