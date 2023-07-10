import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/NavigationTypes";

export type CredentialsInvalidType = {
    email: boolean;
    confirmEmail: boolean;
    password: boolean;
    confirmPassword: boolean;
  };

  export type CredentialsType = {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    displayName: string;
  };

export type AuthProps = {
    authScreenType: "login" | "signUp" | "update";
    onSubmit: (credentials: CredentialsType) => void;
    credentialsInvalid: CredentialsInvalidType;
    
  };

 export type authScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Login', 'SignUp'>

export interface AuthContextType {
	user: null | any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
	login: (props: { email: string; password: string }) => Promise<void>;
	register: (props: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
	update: (props: { displayName: string }) => Promise<void>;
}

export const defaultAuthContext: AuthContextType = {
	user: null,
	setUser: () => {},
	login: async () => {},
	register: async () => {},
	logout: async () => {},
	update: async () => {},
};