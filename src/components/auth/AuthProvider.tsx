import { useState, createContext, useEffect } from "react";
import { Alert } from "react-native";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore'
import { ProviderProps } from "../../constants/genericTypes";
import { AuthContextType, defaultAuthContext } from "./AuthTypes";



export const AuthContext = createContext(defaultAuthContext);

export function AuthProvider({ children }: ProviderProps) {
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);
    })
  },[])

	const login = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			await auth().signInWithEmailAndPassword(email, password);
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				Alert.alert("User not found");
			}
		}
	};

	const register = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			await auth().createUserWithEmailAndPassword(email, password);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				Alert.alert("That email address is already in use!");
			}
			if (error.code === "auth/invalid-email") {
				Alert.alert("That email address is invalid!");
			}
		}
		try {
			await firestore()
			.collection('users')
			.doc(user?.uid)
			.collection('details')
			.add({
				displayName: user?.displayName ?? email,
				email: email
			})
		} catch (error) {
			console.log(error.code)
		}
	};

	const logout = async () => {
		try {
			await auth().signOut();
		} catch (error) {
			Alert.alert(error);
		}
	};

	const update = async ({
		displayName,
	}: {
		displayName: string;
	}) => {
		try {
			await auth().currentUser?.updateProfile({
				displayName: displayName,
			});
		} catch (error) {
			Alert.alert(error);
		} 		
		try {
			await firestore()
			.collection('users')
			.doc(user?.uid)
			.collection('details')
			.add({
				displayName: user?.displayName ?? user?.email,
				email: user?.email
			})
		} catch (error) {
			console.log(error.code)
		}
    finally{
      setUser(auth().currentUser)
    }
	};

	const value: AuthContextType = {
		user,
		setUser,
		login,
		register,
		logout,
		update,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
